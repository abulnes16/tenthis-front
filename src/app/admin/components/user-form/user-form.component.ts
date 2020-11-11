import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Plan from 'src/app/models/plan';
import APIResponse from 'src/app/models/response';
import User from 'src/app/models/user';
import Swal from 'sweetalert2';
import { emailRegex } from '../../../constants/regex';
import { PlanService } from '../../../core/services/admin/plan.service';
import { UserService } from '../../../core/services/admin/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  @Input() editMode: boolean;
  @Output() newUser = new EventEmitter<User>();

  plans: Plan[];
  roles = [
    { name: 'Cliente', value: 'client' },
    { name: 'Dueño', value: 'owner' },
    { name: 'Administrador', value: 'admin' }
  ];

  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
    storeName: new FormControl(''),
    plan: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.pattern(emailRegex)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  userIcon = faUser;

  get name(): AbstractControl {
    return this.userForm.get('name');
  }

  get role(): AbstractControl {
    return this.userForm.get('role');
  }

  get plan(): AbstractControl {
    return this.userForm.get('plan');
  }

  get email(): AbstractControl {
    return this.userForm.get('email');
  }

  get password(): AbstractControl {
    return this.userForm.get('password');
  }

  get store(): AbstractControl {
    return this.userForm.get('storeName');
  }

  constructor(
    private planService: PlanService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.planService.getPlans().subscribe((res: APIResponse) => {
      this.plans = res.data;
    });
  }

  validateRole(event: any): void {
    if (event.target.value !== 'owner') {
      this.plan.disable();
      this.store.disable();
    } else {
      this.plan.enable();
      this.store.enable();
    }
  }

  createUser(): void {
    if (this.userForm.valid) {
      this.userService.createUser(this.userForm.value).subscribe((res: APIResponse) => {
        if (res.status === 201) {
          console.log(res.data);
          Swal.fire('Registro exitoso', 'El usuario se creó con exito', 'success');
          this.newUser.emit(res.data);
          this.userForm.reset();
        } else {
          Swal.fire('Registro fallido', 'Ocurrió un error al crear el usuario', 'error');
        }
      }, (error) => {
        console.log(error);
        Swal.fire('Registro fallido', 'Ocurrió un error al crear el usuario', 'error');
      });
    }
  }
}
