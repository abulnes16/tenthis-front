import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private static route = `${environment.apiURL}/store`;
  constructor(private http: HttpClient) { }

  getStores(): Observable<any> {
    return this.http.get(StoreService.route);
  }

  blockStore(id: string, unblock = false): Observable<any> {
    const url = unblock ?
      `${StoreService.route}/${id}/block?unblock=true` :
      `${StoreService.route}/${id}/block`;
    return this.http.patch(url, null);
  }

  deleteStore(id: string): Observable<any> {
    return this.http.delete(`${StoreService.route}/${id}`);
  }
}
