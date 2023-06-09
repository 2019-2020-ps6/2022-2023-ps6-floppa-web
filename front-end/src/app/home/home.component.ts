import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { HomeService } from 'src/services/home.service';

@Component({
    selector: 'app-home-profiles',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
    countdown: number = 120;
    timer: any;
    private countdownInterval: any;
    private password: string;

    constructor(private router: Router, private homeService: HomeService) {
      homeService.getLogin().subscribe((login) => {
        this.password = login.password;
      });
    }

    ngOnInit(): void {
        this.timer = setTimeout(() => {
            this.router.navigate(['/home-profil-choice']);
        }, this.countdown * 1000);

        this.countdownInterval = setInterval(() => {
            this.countdown--;
            document.getElementById("countdown").innerHTML = 'Le site changera vers cette page automatiquement dans ' + this.countdown + ' secondes...';
        }, 1000);
    }

    ngOnDestroy(): void {
        clearInterval(this.timer);
        clearInterval(this.countdownInterval);
    }

    check(): void {
      this.homeService.getLogin().subscribe((login) => {
        let psw = login.password;
        Swal.fire({
          html: `<label for="title">
              <h3 style="color:black;">Écrire le code secret</h3>
              <input type="password" style="width:502px; height:50px; border-radius: 25px; padding: 10px; font-size: 30;" type="text" id="code" placeholder="CODE">
          </label>`,
          background: 'rgb(130, 165, 241)',
          confirmButtonText: 'Valider',
          focusConfirm: false,
          preConfirm: () => {
            const codeInput = Swal.getPopup().querySelector('#code') as HTMLInputElement;
            const code = codeInput.value;
            if (!code || code!==psw) {
              Swal.showValidationMessage("Veuillez saisir le bon code")
            }
            return {code: code}
          }
        }).then((result) => {
          if (result.value.code===psw) {
              clearInterval(this.timer);
              clearInterval(this.countdownInterval);
              this.router.navigate(["/caregiver-home"]);
          }
        })
        setTimeout(() => {
          Swal.close()
        }, 30 * 1000);
      });
    }
}
