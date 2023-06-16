import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';
import { Location } from '@angular/common';
import { HomeService } from 'src/services/home.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  public userList: User[];

  constructor(private router: Router, public userService: UserService, private location: Location, private homeService: HomeService) {
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.userList = users;
      this.userList.sort((a,b) => a.lastName.localeCompare(b.lastName));
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
    })
    this.userList.sort((a,b) => a.firstName.localeCompare(b.firstName));
  }
  
  updateUserList(selectedSort: string): void {
    this.userService.getUsers().subscribe((users) => {
      this.userList = users;
      this.userList.sort((a,b) => a.lastName.localeCompare(b.lastName));
      if (selectedSort === "firstName") {
        this.userList.sort((a,b) => a.firstName.localeCompare(b.firstName));
      }
      if (selectedSort === "lastName") {
        this.userList.sort((a,b) => a.lastName.localeCompare(b.lastName));
      }
    });
  }
  
  changePassword(newPassword: string): void {
    this.homeService.editLogin(newPassword);
  }
  
  getCurrentPassword(): string {
    let psw: string;
    this.homeService.getLogin().subscribe((login) => {
      psw = login.password;
      return psw;
      });
      return psw;
  }

  public inputNewPassword(): void {
    this.homeService.getLogin().subscribe((login) => {
      let oldLoginPassword = login.password;
      console.log(oldLoginPassword);
      Swal.fire({
        html: `
        <div style="display:flex;flex-direction:column;align-items:center;">
          <label for="oldMdp">
            <div style="display:flex;flex-direction:row;align-items:center;">
              <h3 style="margin-right:10px; font-size:30px">Ancien mot de passe :</h3>
              <input type="password" style="height:60px;width:400; border-radius:25px;font-size:25px;padding:10px" type="text" id="oldMdp">
            </div>
          </label>
          <label for="newMdp">
            <div style="display:flex;flex-direction:row;align-items:center;">
              <h3 style="margin-right:10px; font-size:30px">Nouveau mot de passe :</h3>
              <input type="password" style="height:60px;width:400; border-radius:25px;font-size:25px;padding:10px" type="text" id="newMdp">
            </div>
          </label>
        </div>
        `,
        confirmButtonText: 'Valider nouveau mot de passe',
        focusConfirm: false,
        preConfirm: () => {
          let oldMdpInput = Swal.getPopup().querySelector('#oldMdp') as HTMLInputElement;
          let newMdpInput = Swal.getPopup().querySelector('#newMdp') as HTMLInputElement;
          let oldMdp = oldMdpInput.value;
          let newMdp = newMdpInput.value;
          if (oldMdp != oldLoginPassword){
            Swal.showValidationMessage("Veuillez saisir le bon mot de passe actuel.")
          }

          if(oldMdp === newMdp) {
            Swal.showValidationMessage("Vous venez de saisir le même mot de passe actuel. Veuillez saisir un nouveau mot de passe.")
          }
          return { oldMdp: oldMdp, newMdp: newMdp}
        }
        }).then((result) => {
        let newMdp = result.value.newMdp;
        this.changePassword(newMdp);
      })
      });
  }

}