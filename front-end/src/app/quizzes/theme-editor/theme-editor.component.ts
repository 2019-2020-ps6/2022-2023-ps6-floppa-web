import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { THEME_QUIZ_LIST } from 'src/mocks/quiz-list.mock';
import { Theme } from 'src/models/theme.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-theme-editor',
  templateUrl: './theme-editor.component.html',
  styleUrls: ['./theme-editor.component.scss']
})
export class ThemeEditorComponent implements OnInit {
  public themeList: Theme[];
  public static counter: number = THEME_QUIZ_LIST.length;

  constructor(private router: Router, private route: ActivatedRoute) {
    
  }

  ngOnInit(): void {
    this.themeList = THEME_QUIZ_LIST
  }

  goToTheme(themeIndex: number): void {
    this.router.navigate(["/quiz-editor/" + themeIndex]);
  }

  themeNotExists(themeTitle: string): boolean {
    return THEME_QUIZ_LIST.map(theme => theme.title).find(title => title === themeTitle) !== undefined;
  }
  

  createTheme(): void {
    Swal.fire({
      html: `<label for="title">
        Thème :
        <input class="input-text" type="text" id="title" placeholder="ex: géographie ">
      </label>
      <br>
      <label for="description">
        Description :
        <input class="input-text" type="text" id="description">
      </label>`,
      confirmButtonText: 'Valider',
      focusConfirm: false,
      preConfirm: () => {
        const titleInput = Swal.getPopup().querySelector('#title') as HTMLInputElement;
        const descriptionInput = Swal.getPopup().querySelector('#description') as HTMLInputElement;
        const title = titleInput.value;
        const description = descriptionInput.value;
        if (!title) {
          Swal.showValidationMessage("Veuillez saisir un titre pour le thème")
        }
        else if (this.themeNotExists(title)) {
          Swal.showValidationMessage("Ce thème existe déjà")
        }
        return { title: title, description: description}
      }
    }).then((result) => {
      THEME_QUIZ_LIST.splice(THEME_QUIZ_LIST.length, 0, {
        id: ThemeEditorComponent.counter,
        title: result.value.title,
        description: result.value.description,
        coverImage: null
      });
      ThemeEditorComponent.counter++
      this.themeList = THEME_QUIZ_LIST
    })
  }

  deleteTheme(themeToDelete: Theme): void {
    Swal.fire({
      html: `
        <h2 style="color:white">Êtes-vous sûr de<br>supprimer le Thème<br>"`+themeToDelete.title+`" ?</h2>
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
        this.themeList = this.themeList.filter(theme => theme !== themeToDelete);
        for (let i = 0; i < THEME_QUIZ_LIST.length; i++) {
          if (themeToDelete === THEME_QUIZ_LIST[i]) {
            THEME_QUIZ_LIST.splice(i,1);
            this.themeList = THEME_QUIZ_LIST;
          }
        }
      }
    });
  }
}

