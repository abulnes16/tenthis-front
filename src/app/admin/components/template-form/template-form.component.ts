import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Icon } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss']
})
export class TemplateFormComponent implements OnInit {

  templateForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    css: new FormControl('', [Validators.required]),
    js: new FormControl('', [Validators.required]),
  });

  @Input() icon: Icon;
  @Input() editMode: boolean;

  get name(): AbstractControl {
    return this.templateForm.get('name');
  }
  get description(): AbstractControl {
    return this.templateForm.get('description');
  }
  get css(): AbstractControl {
    return this.templateForm.get('css');
  }
  get js(): AbstractControl {
    return this.templateForm.get('js');
  }


  constructor() { }

  ngOnInit(): void {
  }

  sendTemplate(): void {
    console.log(this.templateForm.value);
  }

}
