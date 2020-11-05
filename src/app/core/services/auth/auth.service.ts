import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private static baseRoute = `${environment.apiURL}/auth`;

  constructor(private http: HttpClient) { }

  register(userData): Observable<any> {
    return this.http.post(`${AuthService.baseRoute}/register`, userData);
  }

  login(email, password): Observable<any> {
    const data = { email, password };
    return this.http.post(`${AuthService.baseRoute}/login`, data);
  }

  setRegisterRole(planName): string {
    switch (planName) {
      case 'Client':
        return 'client';
      default:
        return 'owner';
    }
  }
}
