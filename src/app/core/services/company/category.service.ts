import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import Category from 'src/app/models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private static route = `${environment.apiURL}/category`;
  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get(CategoryService.route);
  }

  getCategory(id: string): Observable<any> {
    return this.http.get(`${CategoryService.route}/${id}`);
  }

  createCategory(category: Category): Observable<any> {
    return this.http.post(CategoryService.route, category);
  }

  updateCategory(id: string, category: Category): Observable<any> {
    return this.http.put(`${CategoryService.route}/${id}`, category);
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete(`${CategoryService.route}/${id}`);
  }
}
