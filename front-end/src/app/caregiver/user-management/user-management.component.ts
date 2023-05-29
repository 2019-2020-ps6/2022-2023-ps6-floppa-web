import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { USER_LIST } from 'src/mocks/user-list.mock';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  public userList: User[] = [];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    for (let user of USER_LIST) {
      this.userList.push(user);
    }
    this.userList.sort((a,b) => a.lastName.localeCompare(b.lastName));
    this.userList.sort((a,b) => a.lastName.localeCompare(b.lastName));
  }

  updateUserList(selectedSort: string): void {
    if (selectedSort === "firstName") {
      this.userList.sort((a,b) => a.firstName.localeCompare(b.firstName));
    }
    if (selectedSort === "lastName") {
      this.userList.sort((a,b) => a.lastName.localeCompare(b.lastName));
    }
  }
}