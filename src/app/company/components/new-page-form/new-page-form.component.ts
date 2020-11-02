import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-page-form',
  templateUrl: './new-page-form.component.html',
  styleUrls: ['./new-page-form.component.scss']
})
export class NewPageFormComponent implements OnInit {

  // tslint:disable-next-line: variable-name
  private _currentForm = 'ct';

  pageForm = new FormGroup({
    html: new FormControl(''),
    css: new FormControl(''),
    wyswyg: new FormControl(''),
    bgBlock: new FormControl(''),
    blockType: new FormControl(''),
    columns: new FormControl('', [Validators.min(1), Validators.max(12)]),
    imgBlock: new FormControl(''),
  });

  constructor() { }

  ngOnInit(): void {
  }

  get currentForm(): string {
    return this._currentForm;
  }

  set currentForm(value: string) {
    this._currentForm = value;
  }

}
