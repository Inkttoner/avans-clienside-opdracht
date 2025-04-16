import { Inject, Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  GuardResult,
  MaybeAsync,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser, UserRole } from '@avans-nx-workshop/shared/api';
import { AuthService } from './auth.service';

/**
 * Verifies that user is logged in before navigating to routes.
 *
 */
@Injectable()
export class LoggedInAuthGuard implements CanActivate, CanActivateChild {
  //
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    console.log('canActivate LoggedIn');
    return this.authService.currentUser$.pipe(
      map((user: IUser | undefined) => {
        if (user && user.token) {
          return true;
        } else {
          console.log('not logged in, reroute to /');
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    console.log('canActivateChild LoggedIn');
    return this.canActivate();
  }
  canActivateUserRoute(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    console.log('canActivateUserRoute');
    return this.authService.currentUser$.pipe(
      map((user: IUser | undefined) => {
        const userId = route.paramMap.get('id');
        if (user && user.token && user._id === userId) {
          return true;
        } else {
          console.log('not authorized, reroute to /login');
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
@Injectable()
export class UserEditGuard implements CanActivate{
    constructor(private authService: AuthService, private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        console.log('canActivateUserRoute');
        return this.authService.currentUser$.pipe(
          map((user: IUser | undefined) => {
            const userId = route.paramMap.get('id');
            if (user && user.token && user._id === userId) {
              return true;
            } else {
              console.log('not authorized, reroute to dashboard');
              this.router.navigate(['/']);
              return false;
            }
          })
        );
    }
}
@Injectable()
export class AdminGuard implements CanActivate{
    constructor(private authService: AuthService, private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        console.log('canActivateAdmin');
        return this.authService.currentUser$.pipe(
          map((user: IUser | undefined) => {
            if (user && user.token && user.role === UserRole.Admin) {
              return true;
            } else {
              console.log('not authorized, reroute to dashboard');
              this.router.navigate(['/']);
              return false;
            }
          })
        );
    }

}
