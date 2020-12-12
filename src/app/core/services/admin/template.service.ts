import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import Template from '../../../models/template';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  private static route = `${environment.apiURL}/template`;
  constructor(private http: HttpClient) { }

  getTemplates(): Observable<any> {
    return this.http.get(TemplateService.route);
  }

  getTemplateById(id: string): Observable<any> {
    return this.http.get(`${TemplateService.route}/${id}`);
  }

  createFormData(template: Template): FormData {
    // Create form data
    const formData = new FormData();
    formData.append('name', template.name);
    formData.append('description', template.description);
    formData.append('html', template.html);
    formData.append('css', template.css);
    formData.append('js', template.js);
    template.media.forEach(file => formData.append('media', file));
    return formData;
  }

  updateFormData(template: Template): FormData {

    const formData = new FormData();
    formData.append('name', template.name);
    formData.append('description', template.description);
    formData.append('html', template.html);
    formData.append('css', template.css);
    formData.append('js', template.js);
    const refFiles = template.media.filter(file => !file.size);
    formData.append('media', JSON.stringify(refFiles));
    template.media.forEach(file => formData.append('files', file));
    return formData;
  }

  createTemplate(template: Template): Observable<any> {
    // Create form data
    const formData = this.createFormData(template);
    return this.http.post(TemplateService.route, formData);
  }

  updateTemplate(id: string, template: Template): Observable<any> {
    const formData = this.updateFormData(template);
    return this.http.put(`${TemplateService.route}/${id}`, formData);
  }


  deleteTemplate(id: string): Observable<any> {
    return this.http.delete(`${TemplateService.route}/${id}`);
  }
}
