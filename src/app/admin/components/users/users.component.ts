import { Component, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import APIResponse from 'src/app/models/response';
import User from 'src/app/models/user';

import { UserService } from '../../../core/services/admin/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  userIcon = faUser;
  editMode = false;
  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((res: APIResponse) => {
      this.users = res.data;
    });
  }

  addUser(user: User): void {
    this.users.push(user);
  }

  newUser(): void {
    this.editMode = false;
  }

  editUser(): void {
    this.editMode = true;
  }

}
