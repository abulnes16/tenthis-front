import { Injectable } from '@angular/core';

import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  private static route = `${environment.apiURL}/media`;
  constructor(private http: HttpClient) { }

  getMediaFiles(mediaIds: string[] = null, storeId: string = null): Observable<any> {
    if (mediaIds !== null && storeId !== null) {
      const data = JSON.stringify([...mediaIds]);
      return this.http.get(`${MediaService.route}?bulk=true&media=${data}&store=${storeId}`);
    }

    if (mediaIds !== null) {
      const data = JSON.stringify([...mediaIds]);
      return this.http.get(`${MediaService.route}?bulk=true&media=${data}`);
    }

    if (storeId !== null) {
      return this.http.get(`${MediaService.route}?store=${storeId}`);
    }

    return this.http.get(MediaService.route);
  }

  getMediaFile(id: string, storeId: string = null): Observable<any> {
    if (storeId !== null) {
      return this.http.get(`${MediaService.route}/${id}?store=${storeId}`);
    }
    return this.http.get(`${MediaService.route}/${id}`);
  }

  uploadMedia(file: File, name: string): Observable<any> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('media', file);

    const req = new HttpRequest('POST',
      MediaService.route, formData,
      { reportProgress: true, responseType: 'json' });

    return this.http.request(req);
  }

  deleteMedia(id: string): Observable<any> {
    return this.http.delete(`${MediaService.route}/${id}`);
  }
}
