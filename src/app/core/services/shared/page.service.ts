import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import Page from 'src/app/models/page';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  private static route = `${environment.apiURL}/page`;

  constructor(private http: HttpClient) { }

  getPages(storeId: string = null): Observable<any> {
    let route = '';
    if (storeId !== null) {
      route = `${PageService.route}?store=${storeId}`;
    } else {
      route = PageService.route;
    }

    return this.http.get(route);
  }

  getPage(id: string): Observable<any> {
    return this.http.get(`${PageService.route}/${id}`);
  }

  createPage(page: Page): Observable<any> {
    return this.http.post(PageService.route, page);
  }

  updatePage(id: string, page: Page): Observable<any> {
    return this.http.put(`${PageService.route}/${id}`, page);
  }

  deletePage(id: string): Observable<any> {
    return this.http.delete(`${PageService.route}/${id}`);
  }

}
