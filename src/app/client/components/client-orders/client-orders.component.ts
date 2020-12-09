import { Component, OnInit } from '@angular/core';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { OrderService } from 'src/app/core/services/shared/order.service';
import APIResponse from 'src/app/models/response';

import { StoreService } from '../../../core/services/shared/store.service';
import Order from '../../../models/orders';
@Component({
  selector: 'app-client-orders',
  templateUrl: './client-orders.component.html',
  styleUrls: ['./client-orders.component.scss']
})
export class ClientOrdersComponent implements OnInit {

  orderIcon = faShoppingBag;

  orders: Order[];
  orderFilter: string;
  currentOrder: Order;
  loading = true;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe((res: APIResponse) => {
      this.orders = res.data;
      this.loading = false;
    });
  }

  showOrderDetails(id: string): void {
    this.currentOrder = this.orders.find((o: Order) => o._id === id);
  }

}
