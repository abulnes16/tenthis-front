import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-page-form',
  templateUrl: './manage-page-form.component.html',
  styleUrls: ['./manage-page-form.component.scss']
})
export class ManagePageFormComponent implements OnInit {

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
