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

  getMediaFiles(): Observable<any> {
    return this.http.get(MediaService.route);
  }

  getMediaFile(id: string): Observable<any> {
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
