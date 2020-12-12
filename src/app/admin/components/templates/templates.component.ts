import { Component, OnInit } from '@angular/core';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import APIResponse from 'src/app/models/response';
import Template from 'src/app/models/template';

import { TemplateService } from '../../../core/services/admin/template.service';
@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {

  templateIcon = faLayerGroup;
  editMode = false;
  currentTemplate: Template;
  templates: Template[];
  loading = true;

  constructor(private templateService: TemplateService) { }

  ngOnInit(): void {
    this.templateService.getTemplates().subscribe((res: APIResponse) => {
      this.templates = res.data;
      this.loading = false;
    });
  }

  newTemplate(): void {
    this.editMode = false;
    this.currentTemplate = null;
  }

  addTemplate(template: Template): void {
    this.templates.push(template);
  }

  deleteTemplate(id: string): void {
    this.templates = this.templates.filter((t: Template) => t._id !== id);
  }

  editTemplate(id: string): void {
    this.editMode = true;
    this.templateService.getTemplateById(id).subscribe((res: APIResponse) => {
      this.currentTemplate = res.data;
    });
  }

}
