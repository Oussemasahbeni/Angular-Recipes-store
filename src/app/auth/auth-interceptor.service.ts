import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, exhaustMap, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //! take(1) will take the latest user value and then unsubscribe
    //! exhaustMap will wait for the first observable to complete and then subscribe to the second observable
    return this.authService.user.pipe(take(1), exhaustMap(user => {
      if (!user || !user.token) {
        // console.log(req)
        return next.handle(req);
      }

      const modifiedReq = req.clone({ params: new HttpParams().set('auth', user.token) })
      // console.log(modifiedReq)
      return next.handle(modifiedReq);

    }))
  }

}