import { Component, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  userIcon = faUser;

  users = [
    {
      name: 'Nombre',
      role: 'Rol'
    },

    {
      name: 'Nombre',
      role: 'Rol'
    },

    {
      name: 'Nombre',
      role: 'Rol'
    },

    {
      name: 'Nombre',
      role: 'Rol'
    },
    {
      name: 'Nombre',
      role: 'Rol'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
