import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const expectedRole = route.data.expectedRole;
    const token = sessionStorage.getItem('token');
    if (!token) {
      this.router.navigateByUrl('/auth/login');
      return false;
    }

    const decoded = decode(token);

    if (decoded.role !== expectedRole) {
      this.router.navigateByUrl('/auth/login');
      return false;
    }

    return true;
  }

}
