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
  loading = true;


  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((res: APIResponse) => {
      this.products = res.data;
      this.loading = false;
    });
  }

  newProduct(): void {
    this.editMode = false;
    this.currentProduct = null;
  }

  addProduct(product: Product): void {
    this.products.push(product);
  }

  updateProduct(product: Product): void {
    this.products = this.products.map((p: Product) => p._id === product._id ? product : p);
  }

  deleteProduct(): void {
    this.products = this.products.filter((p: Product) => p._id !== this.currentProduct._id);
  }

  editProduct(id: string): void {
    this.editMode = true;
    this.productService.getProduct(id).subscribe((res: APIResponse) => {
      this.currentProduct = res.data;
    });
  }
}
