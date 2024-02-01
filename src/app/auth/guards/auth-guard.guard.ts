import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from '../../services/auth.service';



@Injectable({
  providedIn: 'root'
})
export class UserGuardService {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean | UrlTree> | Promise<boolean> | UrlTree {
    // !this is the old way of doing it
    // if (this.authService.isAuthenticated()) {
    //   return true;
    // } else {
    //   this.router.navigate(['/auth']);
    //   return false;
    // }  

    return this.authService.user.pipe(
      take(1),
      map(user => {
        const isAuth = !!user;
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['/auth'])

      }))
  }


}
export const authGuardGuard: CanActivateFn = (next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {

  return inject(UserGuardService).canActivate(next, state);
};
