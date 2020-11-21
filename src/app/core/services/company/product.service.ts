import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Product from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private static route = `${environment.apiURL}/product`;
  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get(ProductService.route);
  }

  getProduct(id: string): Observable<any> {
    return this.http.get(`${ProductService.route}/${id}`);
  }

  createProduct(product: Product): Observable<any> {
    const formData = this.createFormData(product);
    return this.http.post(ProductService.route, formData);
  }

  updateProduct(id: string, product: Product): Observable<any> {
    return this.http.put(`${ProductService.route}/${id}`, product);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${ProductService.route}/${id}`);
  }

  createFormData(product: Product): FormData {
    // Create form data
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price.toString());
    formData.append('category', product.category);
    const tags = product.tags.split(',');
    formData.append('quantity', product.quantity.toString());
    formData.append('tags', tags.toString());
    product.media.forEach(file => formData.append('media', file));
    return formData;
  }

}
