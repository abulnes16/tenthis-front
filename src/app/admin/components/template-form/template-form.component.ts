import { Component, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Icon } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss']
})
export class TemplateFormComponent implements OnInit {

  @ViewChild('editor') editor;
  @Input() icon: Icon;

  js: string;
  css: string;

 /*  ngAfterViewInit() {
    this.editor.setTheme('eclipse');
    this.editor.getEditor().setOptions({
      enableBasicAutocompletion: true
    });
  } */

  constructor() { }

  ngOnInit(): void {
  }

}
