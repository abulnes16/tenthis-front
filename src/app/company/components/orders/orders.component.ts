import { Component, OnInit, ViewChild } from '@angular/core';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Order from 'src/app/models/orders';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  @ViewChild('orderModal') orderModal;
  goIcon = faChevronRight;

  orders: Order[] = [
    {
      numOrder: '1234',
      client: 'Mark',
      date: new Date().toUTCString(),
      total: 50,
      products: []
    },
    {
      numOrder: '1234',
      client: 'Mark',
      date: new Date().toUTCString(),
      total: 50,
      products: []
    },
    {
      numOrder: '1234',
      client: 'Mark',
      date: new Date().toUTCString(),
      total: 50,
      products: []
    },
    {
      numOrder: '1234',
      client: 'Mark',
      date: new Date().toUTCString(),
      total: 50,
      products: []
    },
  ];

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  showOrder(): void {
    this.modalService.open(this.orderModal, { size: 'lg' });
  }

}
