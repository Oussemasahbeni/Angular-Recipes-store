import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import { User } from '../auth/user.model';
import { Router } from '@angular/router';


export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User | null>(null);
  private apiKey = 'AIzaSyD-iaGRvttHr3azc0z00glZjL8gzcvjp-4';
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { }
  signup(email: string, password: string) {
    // console.log(email, password)
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError), tap(response => {
      this.handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn);
    }));
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    // expirationDate is the current time + the expiration time from the response (in seconds) * 1000 to convert to milliseconds
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError), tap(response => {
      this.handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn);
    }));
  }

  isAuthenticated() {

    const user = localStorage.getItem('userData');
    return !!user;
  }

  autoLogin() {
    const user = localStorage.getItem('userData');
    if (!user) {
      return;
    }
    const userData: { email: string, id: string, _token: string, _tokenExpirationDate: string } = JSON.parse(user);
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration)
  }

  private handleError(e: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    // console.log(e);
    if (!e.error || !e.error.error) {
      return throwError(() => new Error(errorMessage));
    }
    switch (e.error.error.message) {
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'Invalid login credentials';
        break;
      case 'USER_DISABLED':
        errorMessage = 'This user has been disabled';
        break;
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists';
        break;

    }
    return throwError(() => new Error(errorMessage));

  }


}
