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

  getProducts(category: string = null, storeId: string = null): Observable<any> {
    let route = `${ProductService.route}`;
    if (category !== null && storeId !== null) {
      route += `?category=${category}&store=${storeId}`;
    } else if (category !== null) {
      route += `?category=${category}`;
    } else if (storeId !== null) {
      route += `?store=${storeId}`;
    }
    return this.http.get(route);
  }

  getProduct(id: string): Observable<any> {
    return this.http.get(`${ProductService.route}/${id}`);
  }

  createProduct(product: Product): Observable<any> {
    const formData = this.createFormData(product);
    return this.http.post(ProductService.route, formData);
  }

  updateProduct(id: string, product: Product): Observable<any> {
    const formData = this.updateFormData(product);
    return this.http.put(`${ProductService.route}/${id}`, formData);
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

    let tags = [];
    if (product.tags) {
      tags = this.parseTags(product.tags);
    }

    formData.append('quantity', product.quantity.toString());
    formData.append('tags', tags.toString());
    product.media.forEach(file => formData.append('media', file));
    return formData;
  }

  updateFormData(product: Product): FormData {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price.toString());
    formData.append('category', product.category);
    formData.append('quantity', product.quantity.toString());
    let tags = [];
    if (product.tags) {
      tags = this.parseTags(product.tags);
    }
    formData.append('tags', tags.toString());
    const refFiles = product.media.filter(file => !file.size);
    formData.append('media', JSON.stringify(refFiles));
    product.media.forEach(file => formData.append('files', file));
    return formData;
  }


  parseTags(tags: string): Array<string> {
    return tags.split(',');
  }

}
