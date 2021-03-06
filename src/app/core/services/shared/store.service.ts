import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import Configuration from 'src/app/models/configuration';
import Store from 'src/app/models/store';
import APIResponse from 'src/app/models/response';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private static route = `${environment.apiURL}/store`;

  private loggedStore: Store;

  constructor(private http: HttpClient) { }

  get store(): Store {
    return this.loggedStore;
  }

  getStores(): Observable<any> {
    return this.http.get(StoreService.route);
  }
  getStore(id: string): Observable<any> {
    const subject = new Subject<Store>();
    this.http.get(`${StoreService.route}/${id}`).subscribe((res: APIResponse) => {
      this.loggedStore = res.data;
      subject.next(res.data);
      sessionStorage.setItem('store', JSON.stringify(res.data));
    });

    return subject.asObservable();
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

  saveConfig(
    id: string,
    storeName: string,
    description: string,
    config: Configuration,
    logoFile: File,
    faviconFile: File,
  ): Observable<any> {
    const formData = this.getFormData(config, storeName, description, logoFile, faviconFile);
    return this.http.patch(`${StoreService.route}/${id}/config`, formData);
  }

  getFormData(
    config: Configuration,
    storeName: string,
    description: string,
    logoFile: File,
    faviconFile: File
  ): FormData {
    const formData = new FormData();

    formData.append('name', storeName);
    formData.append('description', description);
    formData.append('logo', JSON.stringify(config.logo));
    formData.append('favicon', JSON.stringify(config.favicon));
    formData.append('keywords', config.keywords.toString());
    formData.append('header', config.header);
    formData.append('footer', config.footer);
    formData.append('css', config.css);
    formData.append('js', config.js);
    formData.append('useTemplate', config.useTemplate.toString());
    formData.append('faviconImg', faviconFile);
    formData.append('logoImg', logoFile);

    let storeTemplate = '';
    if (config.template) {
      storeTemplate = config.template;
    }
    formData.append('template', storeTemplate);

    return formData;
  }
}
