import { Component, OnInit } from '@angular/core';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-client-orders',
  templateUrl: './client-orders.component.html',
  styleUrls: ['./client-orders.component.scss']
})
export class ClientOrdersComponent implements OnInit {

  orderIcon = faShoppingBag;

  orders = [
    {
      id: '1345',
      store: 'Gardens',
      date: '25/05/2020',
      total: 1500
    },
    {
      id: '2567',
      store: 'Dog suvenir',
      date: '25/05/2020',
      total: 1500
    },
    {
      id: '4571',
      store : 'Game world',
      date: '25/05/2020',
      total: 1500
    },
    {
      id: '4571',
      store : 'Game world',
      date: '25/05/2020',
      total: 1500
    },
    {
      id: '4571',
      store : 'Game world',
      date: '25/05/2020',
      total: 1500
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
