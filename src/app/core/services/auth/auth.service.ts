import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseRoute = 'auth';

  constructor(private http: HttpClient) { }

  register(userData): Observable<any> {
    return this.http.post(`${environment.apiURL}/${this.baseRoute}/register`, userData);
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
