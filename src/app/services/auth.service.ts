import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';


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

  private apiKey = 'AIzaSyD-iaGRvttHr3azc0z00glZjL8gzcvjp-4';
  signup(email: string, password: string) {
    // console.log(email, password)
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError))
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
  constructor(private http: HttpClient) { }

}
