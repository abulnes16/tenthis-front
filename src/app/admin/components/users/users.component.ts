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
  currentUser: User;
  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((res: APIResponse) => {
      this.users = res.data;
    });
  }

  addUserToList(user: User): void {
    this.users.push(user);
  }

  deleteUserFromList(): void {
    this.users = this.users.filter((u: User) => (u._id !== this.currentUser._id));
    this.editMode = false;
  }

  updateUserList(user: User): void {
    this.users = this.users.map((u: User) => (u._id === user._id ? user : u));
    this.editMode = false;
  }

  newUser(): void {
    this.editMode = false;
    this.currentUser = null;
  }

  editUser(id: string): void {
    this.editMode = true;
    this.userService.getUserById(id).subscribe((res: APIResponse) => {
      if (res.status === 200) {
        const user = res.data;
        let userPlan = '';
        if (user.plan) {
          userPlan = user.plan._id;
        }
        this.currentUser = {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          plan: userPlan,
          store: user.store ? user.store : '',
          password: '',
        };
      }
    });

  }

}
