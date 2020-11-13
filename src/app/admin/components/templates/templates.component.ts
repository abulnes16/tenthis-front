import { Component, OnInit } from '@angular/core';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import Template from 'src/app/models/template';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {

  templateIcon = faLayerGroup;
  editMode = false;
  templates: Template[] = [
    {
      name: 'Plantilla',
      css: '',
      js: '',
      html: '',
      description: '',
      media: null
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  newTemplate(): void {
    this.editMode = false;
  }

  editTemplate(): void {
    this.editMode = true;
  }

}
