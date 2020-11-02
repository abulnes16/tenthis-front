import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  @Input() editMode: boolean;

  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
    plan: new FormControl(''),
    store: new FormControl(''),
    email: new FormControl(''),
  });

  userIcon = faUser;

  get name(): AbstractControl {
    return this.userForm.get('name');
  }

  get role(): AbstractControl {
    return this.userForm.get('role');
  }

  constructor() { }

  ngOnInit(): void {
  }

}
