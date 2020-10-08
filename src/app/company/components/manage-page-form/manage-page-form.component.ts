import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-page-form',
  templateUrl: './manage-page-form.component.html',
  styleUrls: ['./manage-page-form.component.scss']
})
export class ManagePageFormComponent implements OnInit {

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
