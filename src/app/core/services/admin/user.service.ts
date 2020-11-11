import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import User from 'src/app/models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private static route = `${environment.apiURL}/user`;
  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(UserService.route);
  }

  createUser(user: User): Observable<any> {
    return this.http.post(`${environment.apiURL}/auth/register`, user);
  }

}
