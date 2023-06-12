import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { USER_LIST } from 'src/mocks/user-list.mock';
import { User } from 'src/models/user.model';
import Swal from 'sweetalert2';
import { UserService } from 'src/services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  public userList: User[];

  constructor(private router: Router, public userService: UserService, private location: Location) {
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.userList = users;
      this.userList.sort((a,b) => a.lastName.localeCompare(b.lastName));
      console.log(this.userList)
    })
  }

  delete(userToDelete: User) {
    Swal.fire({
      html: `
        <h2 style="color:white">Êtes-vous sûr de<br>supprimer le patient<br>"`+userToDelete.firstName+`" "`+userToDelete.lastName+`" ?</h2>
        <img src="/assets/trash.png" alt="trash">
      `,
      background: 'rgb(131,104,96)',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
      focusConfirm: false,
      confirmButtonColor: 'rgb(150,255,150)'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(userToDelete);
        window.location.reload();
        // this.updateUserList("firstName");

      }
    });
  }

  refresh(): void {
    this.userService.getUsers().subscribe((users) => {
      this.userList = users;
      this.userList.sort((a,b) => a.lastName.localeCompare(b.lastName));
      console.log(this.userList)
    })
    this.userList.sort((a,b) => a.firstName.localeCompare(b.firstName));
  }

  updateUserList(selectedSort: string): void {
    this.userService.getUsers().subscribe((users) => {
      this.userList = users;
      console.log(users);
      console.log(this.userList);
      this.userList.sort((a,b) => a.lastName.localeCompare(b.lastName));
      console.log(this.userList)
      if (selectedSort === "firstName") {
        this.userList.sort((a,b) => a.firstName.localeCompare(b.firstName));
      }
      if (selectedSort === "lastName") {
        this.userList.sort((a,b) => a.lastName.localeCompare(b.lastName));
      }
    });
  }
}