import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate {

  constructor(private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = sessionStorage.getItem('token');
    if (token) {
      const decoded = decode(token);
      switch (decoded.role) {
        case 'client':
          this.router.navigateByUrl('/shop');
          break;
        case 'owner':
          this.router.navigateByUrl('/admin-companies');
          break;
        case 'admin':
          this.router.navigateByUrl('/admin');
          break;
      }
    }
    return true;

  }

}
