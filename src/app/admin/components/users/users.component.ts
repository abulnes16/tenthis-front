import { Component, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import User from 'src/app/models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  userIcon = faUser;
  editMode = false;
  users: User[] = [
    {
      name: 'Nombre',
      email: '',
      role: 'Rol',
      store: null,
      plan: null
    },
    {
      name: 'Nombre',
      email: '',
      role: 'Rol',
      store: null,
      plan: null
    },
    {
      name: 'Nombre',
      email: '',
      role: 'Rol',
      store: null,
      plan: null
    },
    {
      name: 'Nombre',
      email: '',
      role: 'Rol',
      store: null,
      plan: null
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  newUser(): void {
    this.editMode = false;
  }

  editUser(): void {
    this.editMode = true;
  }

}
