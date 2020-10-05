import { Component, OnInit } from '@angular/core';
import { faBox } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productIcon = faBox;

  products = [
    {
      name: 'Producto'
    },
    {
      name: 'Producto'
    },
    {
      name: 'Producto'
    },
    {
      name: 'Producto'
    },
    {
      name: 'Producto'
    },
    {
      name: 'Producto'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
