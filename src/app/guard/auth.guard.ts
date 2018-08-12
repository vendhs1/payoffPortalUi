import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { GuardService } from './guard.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private guard:GuardService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('currentUser')) {
      this.guard.checkLoginCredential(true);
      return true;

    }

    // not logged in so redirect to login page with the return url
    this.guard.checkLoginCredential(false);
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
