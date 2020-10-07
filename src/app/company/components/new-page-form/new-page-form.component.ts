import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-page-form',
  templateUrl: './new-page-form.component.html',
  styleUrls: ['./new-page-form.component.scss']
})
export class NewPageFormComponent implements OnInit {

  // tslint:disable-next-line: variable-name
  private _currentForm = 'ct';

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
