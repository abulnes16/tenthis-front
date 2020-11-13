import { Component, EventEmitter, Input, OnInit, OnChanges, Output } from '@angular/core';
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
export class UserFormComponent implements OnInit, OnChanges {

  @Input() editMode: boolean;
  @Input() editUser: User;
  @Output() createdUser = new EventEmitter<User>();
  @Output() deletedUser = new EventEmitter<any>();
  @Output() updatedUser = new EventEmitter<User>();

  plans: Plan[];
  roles = [
    { name: 'Cliente', value: 'client' },
    { name: 'Dueño', value: 'owner' },
    { name: 'Administrador', value: 'admin' }
  ];

  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
    store: new FormControl(''),
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
    return this.userForm.get('store');
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

  ngOnChanges(): void {
    this.setFormData();
  }

  validateRole(event: any): void {
    this.disableInputs(event.target.value);
  }

  setFormData(): void {
    if (!this.editMode) {
      this.userForm.reset();
      this.plan.enable();
      this.store.enable();
      this.email.enable();
    } else {
      if (this.editUser) {
        switch (this.editUser.role) {
          case 'admin':
            this.plan.disable();
            this.store.disable();
            break;
          case 'client':
            this.store.disable();
            this.plan.enable();
            break;
          default:
            this.plan.enable();
            this.store.enable();
            break;
        }

        this.email.disable();

        // Erase _id property for fill the form group
        const formData = { ...this.editUser };
        delete formData._id;
        this.userForm.setValue(formData);
      }
    }
  }

  disableInputs(value: any): void {
    switch (value) {
      case 'admin':
        if (this.plan.value) {
          this.plan.setValue(null);
        }
        if (this.store.value) {
          this.store.setValue(null);
        }
        this.plan.disable();
        this.store.disable();
        break;
      case 'client':
        if (this.plan.value) {
          this.plan.setValue(null);
        }
        if (this.store.value) {
          this.store.setValue(null);
        }
        this.store.disable();
        this.plan.enable();
        break;
      default:
        this.plan.enable();
        this.store.enable();
        break;
    }
  }

  createUser(): void {
    if (this.userForm.valid) {
      const newUser = { ...this.userForm.value, storeName: this.store.value };
      this.userService.createUser(newUser).subscribe((res: APIResponse) => {
        if (res.status === 201) {
          Swal.fire('Registro exitoso', 'El usuario se creó con exito', 'success');
          this.createdUser.emit(res.data);
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

  updateUser(): void {
    const updateUser = { ...this.userForm.getRawValue(), storeName: this.store.value };
    if (this.validateUpdate(updateUser)) {
      this.userService.updateUser(this.editUser._id, updateUser).subscribe((res: APIResponse) => {
        if (res.status === 200) {
          Swal.fire('Usuario actualizado', 'El usuario se actualizó con exito', 'success');
          this.updatedUser.emit(res.data);
        } else {
          Swal.fire('Actualización fallida', 'Ocurrió un error al actualizar el usuario', 'error');
        }
      }, (error) => {
        console.log(error);
        Swal.fire('Actualización fallida', 'Ocurrió un error al actualizar el usuario', 'error');
      });
    } else {
      Swal.fire(
        'Datos invalidos',
        `No puede seleccionar el rol ${updateUser.role} con el plan seleccionado actualmente`,
        'error'
      );
    }
  }

  validateUpdate(user: User): boolean {

    const clientPlan = this.plans.find(plan => plan.name === 'Client');
    if (user.role === 'client' && user.plan !== clientPlan._id) {
      return false;
    }

    if (user.role === 'owner' && user.plan === clientPlan._id) {
      return false;
    }
    return true;
  }

  async deleteUser(): Promise<any> {
    const confirm = await Swal.fire({
      title: '¿Esta seguro de eliminar este usuario?',
      text: `Esta acción es irreversible,
             si borra el usuario es probable que
             tambien se borre su tienda`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#108b47',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    });

    if (confirm.isConfirmed) {
      this.userService.deleteUser(this.editUser._id).subscribe((res: APIResponse) => {
        if (res.status === 200) {
          Swal.fire('Usuario eliminado', 'El usuario se eliminó con exito', 'success');
          this.userForm.reset();
          this.deletedUser.emit();
        } else {
          Swal.fire('Eliminación fallida', 'Ocurrió un error al eliminar el usuario', 'error');
        }
      }, (error) => {
        console.log(error);
        Swal.fire('Eliminación fallida', 'Ocurrió un error al eliminar el usuario', 'error');
      });
    }
  }
}
