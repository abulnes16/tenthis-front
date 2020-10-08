import { Component, OnInit } from '@angular/core';
import { faCampground } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.scss']
})
export class StoreListComponent implements OnInit {

  storeIcon = faCampground;

  stores = [
    {
      name: 'Tienda A'
    },
    {
      name: 'Tienda B'
    },
    {
      name: 'Tienda C'
    },
    {
      name: 'Tienda D'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
