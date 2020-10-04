import { Component, OnInit } from '@angular/core';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {

  templateIcon = faLayerGroup;
  templates = [
    {
      name: 'Plantilla'
    },
    {
      name: 'Plantilla'
    },
    {
      name: 'Plantilla'
    },
    {
      name: 'Plantilla'
    },
    {
      name: 'Plantilla'
    },
    {
      name: 'Plantilla'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
