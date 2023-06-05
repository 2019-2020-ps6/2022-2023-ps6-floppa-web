import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { USER_LIST } from 'src/mocks/user-list.mock';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public userList: User[];

  constructor(private userService: UserService) {
    this.userService.getUsers().subscribe((users) => {
      this.userList = users;
    })
  }

  ngOnInit(): void {
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user);
  }
}
