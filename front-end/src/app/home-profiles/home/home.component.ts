import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home-profiles',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    constructor(private router: Router) {}
    ngOnInit(): void {}
    navigateToResidentConnection() {
        this.router.navigate(['/resident-connection']);
    }
}

// Récupère le bouton et la modale
const btn = document.getElementById("staff-connection");
const modal = document.getElementById("staffConnection");

// Récupère l'élément <span> qui permet de fermer la modale
const span = document.getElementsByClassName("close")[0] as HTMLElement;


// Quand l'utilisateur clique sur le bouton, affiche la modale
btn.onclick = function() {
  modal.style.display = "block";
}

// Quand l'utilisateur clique sur <span> (x), ferme la modale
span.onclick = function() {
  modal.style.display = "none";
}

// Quand l'utilisateur clique en dehors de la modale, ferme la modale
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
