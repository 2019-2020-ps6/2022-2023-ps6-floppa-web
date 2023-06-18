import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { Location } from '@angular/common';
import { HomeService } from 'src/services/home.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'caregiver-home',
  templateUrl: './caregiver-home.component.html',
  styleUrls: ['./caregiver-home.component.scss']
})
export class CaregiverHomeComponent implements OnInit {

  constructor(private router: Router, private location: Location, private homeService: HomeService) {
  }

  ngOnInit(): void {
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
              <h3 style="margin-right:10px; font-size:30px">Ancien code secret :</h3>
              <input type="password" style="height:60px;width:400; border-radius:25px;font-size:25px;padding:10px" type="text" id="oldMdp">
            </div>
          </label>
          <label for="newMdp">
            <div style="display:flex;flex-direction:row;align-items:center;">
              <h3 style="margin-right:10px; font-size:30px">Nouveau code secret :</h3>
              <input type="password" style="height:60px;width:400; border-radius:25px;font-size:25px;padding:10px" type="text" id="newMdp">
            </div>
          </label>
        </div>
        `,
        confirmButtonText: 'Valider nouveau code secret',
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