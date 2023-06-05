import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { USER_LIST } from 'src/mocks/user-list.mock';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  public userList: User[];

  constructor(private router: Router, public userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.userList = users;
      this.userList.sort((a,b) => a.lastName.localeCompare(b.lastName));
      console.log(this.userList)
    })
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