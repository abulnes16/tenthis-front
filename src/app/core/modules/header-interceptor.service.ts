import { Injectable } from '@angular/core';

import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('token');
    const auth = { Authorization: `Bearer ${token}` };
    return next.handle(httpRequest.clone({ setHeaders: auth }));
  }
}
