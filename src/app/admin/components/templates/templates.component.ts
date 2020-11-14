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

  constructor(private templateService: TemplateService) { }

  ngOnInit(): void {
    this.templateService.getTemplates().subscribe((res: APIResponse) => {
      this.templates = res.data;
    });
  }

  newTemplate(): void {
    this.editMode = false;
    this.currentTemplate = null;
  }

  addTemplate(template: Template): void {
    this.templates.push(template);
  }

  editTemplate(): void {
    this.editMode = true;
  }

}
