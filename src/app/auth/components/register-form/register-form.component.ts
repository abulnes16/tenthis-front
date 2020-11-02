import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn, Form } from '@angular/forms';
import { emailRegex } from '../../../constants/regex';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  @Input() registerText: string;

  registerForm = new FormGroup({
    plan: new FormControl('0', [Validators.required]),
    store: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.pattern(emailRegex)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPass: new FormControl('', [Validators.required, Validators.minLength(8)])

  }, { validators: this.checkPassword });

  get plan(): AbstractControl {
    return this.registerForm.get('plan');
  }
  get store(): AbstractControl {
    return this.registerForm.get('store');
  }
  get email(): AbstractControl {
    return this.registerForm.get('email');
  }
  get password(): AbstractControl {
    return this.registerForm.get('password');
  }
  get confirm(): AbstractControl {
    return this.registerForm.get('confirmPass');
  }


  constructor() { }

  ngOnInit(): void {
  }

  checkPassword(control: AbstractControl): ValidatorFn {
    if (control.get('password').value !== control.get('confirmPass').value) {
      control.get('confirmPass').setErrors({ mismatch: true });
    }
    return;
  }




}
