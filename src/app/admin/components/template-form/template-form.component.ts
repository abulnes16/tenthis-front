import { Component, Input, OnInit } from '@angular/core';
import { Icon } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss']
})
export class TemplateFormComponent implements OnInit {


  @Input() icon: Icon;

  js: string;
  css: string;


  constructor() { }

  ngOnInit(): void {
  }

}
