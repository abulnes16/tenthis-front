import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

import Plan from '../../../models/plan';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  private static route = `${environment.apiURL}/plan`;

  constructor(private http: HttpClient) { }

  getPlans(): Observable<any> {
    return this.http.get(PlanService.route);
  }

  createPlan(plan: Plan): Observable<any> {
    return this.http.post(PlanService.route, plan);
  }

  updatePlan(id: string, plan: Plan): Observable<any> {
    return this.http.put(`${PlanService.route}/${id}`, plan);
  }

  deletePlan(id: string): Observable<any> {
    return this.http.delete(`${PlanService.route}/${id}`);
  }
}
