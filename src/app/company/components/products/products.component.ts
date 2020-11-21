import { Component, OnInit } from '@angular/core';
import { faBox } from '@fortawesome/free-solid-svg-icons';
import Product from 'src/app/models/product';
import APIResponse from 'src/app/models/response';

import { ProductService } from '../../../core/services/company/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productIcon = faBox;
  editMode = false;

  products: Product[];
  currentProduct: Product;


  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((res: APIResponse) => {
      this.products = res.data;
    });
  }

  newProduct(): void {
    this.editMode = false;
    this.currentProduct = null;
  }

  addProduct(product: Product): void {
    this.products.push(product);
  }

  editProduct(id: string): void {
    this.editMode = true;
    this.productService.getProduct(id).subscribe((res: APIResponse) => {
      this.currentProduct = res.data;
    });
  }
}
