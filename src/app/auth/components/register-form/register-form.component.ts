import { Component, OnInit, Input } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidatorFn
} from '@angular/forms';
import { Router } from '@angular/router';
import { emailRegex } from '../../../constants/regex';

import { AuthService } from '../../../core/services/auth/auth.service';
import { PlanService } from '../../../core/services/admin/plan.service';
import Swal from 'sweetalert2';
import Plan from 'src/app/models/plan';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  @Input() registerText: string;

  registerForm = new FormGroup({
    plan: new FormControl('0', [Validators.required]),
    storeName: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.pattern(emailRegex)]),
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPass: new FormControl('', [Validators.required, Validators.minLength(8)])

  }, { validators: this.checkPassword });

  plans: Plan[];


  get plan(): AbstractControl {
    return this.registerForm.get('plan');
  }
  get store(): AbstractControl {
    return this.registerForm.get('storeName');
  }

  get name(): AbstractControl {
    return this.registerForm.get('name');
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


  constructor(
    private authService: AuthService,
    private planService: PlanService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.planService.getPlans().subscribe((res: any) => {
      this.plans = [...res.data];
    });
  }

  validatePlan(event): void {
    if (event.target.value === 'Client') {
      this.store.disable();
    } else {
      this.store.enable();
    }
  }

  checkPassword(control: AbstractControl): ValidatorFn {
    if (control.get('password').value !== control.get('confirmPass').value) {
      control.get('confirmPass').setErrors({ mismatch: true });
    }
    return;
  }

  register(): void {
    if (this.registerForm.valid) {

      const role = this.authService.setRegisterRole(this.plan.value);
      const currentPlan = this.plans.find(plan => plan.name === this.plan.value);
      const userData = { ...this.registerForm.value, plan: currentPlan._id, role };

      this.authService.register(userData).subscribe(async (res: any) => {
        if (res.status === 201) {
          await Swal.fire('Usuario creado', 'Se ha creado tu cuenta exitosamente', 'success');
          this.router.navigateByUrl('/login');
        } else {
          Swal.fire('Error de registro', 'Ocurrió un error al crear el usuario', 'error');
        }
      }, (error) => {
        console.log(error);
        Swal.fire('Creación fallida', 'Ocurrió un error al crear el usuario', 'error');
      });
    } else {
      Swal.fire('Información invalida', 'Debe ingresar la información correspondiente', 'error');
    }
  }
}
