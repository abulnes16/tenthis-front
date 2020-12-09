import { Component, OnInit, ViewChild } from '@angular/core';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Order from 'src/app/models/orders';
import APIResponse from 'src/app/models/response';

import { OrderService } from '../../../core/services/shared/order.service';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  @ViewChild('orderModal') orderModal;
  goIcon = faChevronRight;

  orderFilter: string;
  orders: Order[];
  currentOrder: Order;
  loading = true;

  constructor(
    private modalService: NgbModal,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe((res: APIResponse) => {
      this.orders = res.data;
      this.loading = false;
    });
  }

  showOrder(id: string): void {
    this.currentOrder = this.orders.find((o: Order) => o._id === id);
    this.modalService.open(this.orderModal, { size: 'lg' });
  }

}
