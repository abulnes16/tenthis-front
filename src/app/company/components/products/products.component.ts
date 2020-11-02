import { Component, OnInit } from '@angular/core';
import { faBox } from '@fortawesome/free-solid-svg-icons';
import Product from 'src/app/models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productIcon = faBox;
  editMode = false;

  products: Product[] = [
    {
      name: 'Producto',
      category: null,
      description: '',
      media: null,
      price: 0,
      quantity: 0,
      tags: ['']
    },
    {
      name: 'Producto',
      category: null,
      description: '',
      media: null,
      price: 0,
      quantity: 0,
      tags: ['']
    },
    {
      name: 'Producto',
      category: null,
      description: '',
      media: null,
      price: 0,
      quantity: 0,
      tags: ['']
    },
    {
      name: 'Producto',
      category: null,
      description: '',
      media: null,
      price: 0,
      quantity: 0,
      tags: ['']
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  newProduct(): void {
    this.editMode = false;
  }

  editProduct(): void {
    this.editMode = true;
  }
}
