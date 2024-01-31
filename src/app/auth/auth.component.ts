import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthResponseData, AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error: string = '';

  authForm: FormGroup = new FormGroup({});

  constructor(public auth: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.authForm = this.auth.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;

  }


  onSubmit() {
    // console.log(this.authForm.value);

    let authObs: Observable<AuthResponseData>;

    if (!this.authForm.valid) {
      console.log('Invalid form');
      return;
    }
    this.isLoading = true;
    const email = this.authForm.value.email;
    const password = this.authForm.value.password;
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      {
        next: (v) => { console.log(v); this.isLoading = false, this.error = '' },
        error: (e) => {
          console.error(e);
          this.error = e.message;
          // console.log(this.error)
          this.isLoading = false;
        },
        complete: () => console.info('complete')
      }
    )
    this.authForm.reset();
  }

}
