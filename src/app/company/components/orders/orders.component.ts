import { Component, OnInit } from '@angular/core';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  goIcon = faChevronRight;

  orders = [
    {
      id: '1234',
      client: 'Mark',
      date: '25/02/2020',
      total: 50,
    },
    {
      id: '1234',
      client: 'Mark',
      date: '25/02/2020',
      total: 50,
    },
    {
      id: '1234',
      client: 'Mark',
      date: '25/02/2020',
      total: 50,
    },
    {
      id: '1234',
      client: 'Mark',
      date: '25/02/2020',
      total: 50,
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
