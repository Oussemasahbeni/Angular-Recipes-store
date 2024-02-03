import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthResponseData, AuthService } from '../services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponentComponent } from '../shared/alert/AlertComponent/AlertComponent.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  isLoginMode = true;
  isLoading = false;
  error: string = '';

  private closeSub: Subscription | undefined = new Subscription();

  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective | undefined;

  authForm: FormGroup = new FormGroup({});

  constructor(public auth: FormBuilder, private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) { }

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
        next: (v) => {
          // console.log(v);
          this.isLoading = false;
          this.error = '';
          this.router.navigate(['/recipes']);
        },
        error: (e) => {
          console.error(e);
          this.error = e.message;
          this.showErrorAlert(e.message);
          // console.log(this.error)
          this.isLoading = false;
        },
        complete: () => console.info('complete')
      }
    )
    this.authForm.reset();
  }

  private showErrorAlert(message: string) {
    // first we need to create a component factory, a component factory is a class that knows how to create a component.
    const alertCmpFct = this.componentFactoryResolver.resolveComponentFactory(AlertComponentComponent)
    // then we need to get the view container ref of the place where we want to render the component.
    // we can get the view container ref using the @ViewChild decorator.
    const hostViewContainerRef = this.alertHost?.viewContainerRef;
    // clear the view container ref to remove any component that is already rendered.
    hostViewContainerRef?.clear();
    // then we need to create the component using the component factory.
    const componentRef = hostViewContainerRef?.createComponent(alertCmpFct)
    // then we need to set the properties of the component.
    if (componentRef && componentRef.instance) {
      componentRef.instance.message = message;
    }

    this.closeSub = componentRef?.instance.close.subscribe(() => {
      this.closeSub?.unsubscribe();
      hostViewContainerRef?.clear();
    });
  }
  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }

  }
  onHandleError() {
    this.error = '';
  }

}
