import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  private static baseRoute = `${environment.apiURL}/plan`;

  constructor(private http: HttpClient) { }

  getPlans(): Observable<any> {
    return this.http.get(PlanService.baseRoute);
  }
}
