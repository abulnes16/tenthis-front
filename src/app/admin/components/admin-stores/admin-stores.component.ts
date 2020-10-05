import { Component, OnInit } from '@angular/core';
import { faBan, faCampground, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-stores',
  templateUrl: './admin-stores.component.html',
  styleUrls: ['./admin-stores.component.scss']
})
export class AdminStoresComponent implements OnInit {


  tentIcon = faCampground;
  blockIcon = faBan;
  deleteIcon = faTrash;

  stores = [
    {
      name: 'Tienda',
    },
    {
      name: 'Tienda',
    },
    {
      name: 'Tienda',
    },
    {
      name: 'Tienda',
    },
    {
      name: 'Tienda',
    },
    {
      name: 'Tienda',
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
