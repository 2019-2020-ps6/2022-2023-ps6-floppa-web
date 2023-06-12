import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { USER_LIST } from 'src/mocks/user-list.mock';
import { User } from 'src/models/user.model';
import { HomeService } from 'src/services/home.service';
import { password } from 'src/mocks/quiz-list.mock';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  public password: string;
  public userList: User[] = [];

  constructor(private router: Router, private homeService: HomeService) {
  }

  ngOnInit(): void {
    this.getCurrentPassword();
    console.log(this.getCurrentPassword());
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
  
  changePassword(newPassword: string): void {
    this.homeService.edit(newPassword);
  }
  
  getCurrentPassword(): string {
    return this.homeService.getPassword();//.subscribe( (password) => {this.password = password; } );
  }
  public inputNewPassword(): void {
    Swal.fire({
      html: `
      <div style="display:flex;flex-direction:column;align-items:center;">
        <label for="oldMdp">
          <div style="display:flex;flex-direction:row;align-items:center;">
            <h3 style="margin-right:10px; font-size:30px">Ancien mot de passe :</h3>
            <input style="height:60px;width:400; border-radius:25px;font-size:25px;padding:10px" type="text" id="oldMdp">
          </div>
        </label>
        <label for="newMdp">
          <div style="display:flex;flex-direction:row;align-items:center;">
            <h3 style="margin-right:10px; font-size:30px">Nouveau mot de passe :</h3>
            <input style="height:60px;width:400; border-radius:25px;font-size:25px;padding:10px" type="text" id="newMdp">
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
        console.log(password);
        if (oldMdp != password.password){
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
  }

}