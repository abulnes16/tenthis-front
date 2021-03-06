import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import decode from 'jwt-decode';

import { AuthService } from '../../../core/services/auth/auth.service';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  get email(): AbstractControl {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {
  }

  login(): void {
    if (this.loginForm.valid) {

      this.authService.login(this.email.value, this.password.value)
        .subscribe(async (res: any) => {
          if (res.status === 200) {
            const { token } = res.data;
            sessionStorage.setItem('token', token);
            await Swal.fire('Login exitoso', '¡Bienvenido a Tenthis!', 'success');
            const tokenPayload = decode(token);
            switch (tokenPayload.role) {
              case 'client':
                this.router.navigateByUrl('/shop');
                break;
              case 'owner':
                this.router.navigateByUrl('/admin-companies');
                break;
              case 'admin':
                this.router.navigateByUrl('/admin');
                break;
            }
          } else {
            Swal.fire('Error de autenticación', 'Usuario o contraseña incorrecta', 'error');
          }
        },
          (error) => {
            if (error.status === 404) {
              Swal.fire('Error de autenticación', 'Usuario no encontrado', 'error');
            }

            if (error.status === 400) {
              Swal.fire('Error de autenticación', 'Usuario o contraseña incorrecta', 'error');
            }

          });
    } else {
      Swal.fire('Información invalida', 'Debe completar toda la información', 'error');
    }
  }

}
