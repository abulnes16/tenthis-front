import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import Order from 'src/app/models/orders';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private static route = `${environment.apiURL}/order`;

  constructor(private http: HttpClient) { }

  getOrders(): Observable<any> {
    return this.http.get(OrderService.route);
  }

  getOrder(id: string): Observable<any> {
    return this.http.get(`${OrderService.route}/${id}`);
  }

  createOrder(order: Order): Observable<any> {
    return this.http.post(OrderService.route, order);
  }
}
