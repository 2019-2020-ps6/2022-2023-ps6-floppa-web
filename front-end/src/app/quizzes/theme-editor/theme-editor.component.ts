import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { THEME_QUIZ_LIST } from 'src/mocks/quiz-list.mock';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-theme-editor',
  templateUrl: './theme-editor.component.html',
  styleUrls: ['./theme-editor.component.scss']
})
export class ThemeEditorComponent implements OnInit {
  public themeList: string[];

  constructor(private router: Router, private route: ActivatedRoute) {
    
  }

  ngOnInit(): void {
    this.themeList = THEME_QUIZ_LIST.map(theme => theme.title)
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
        id: THEME_QUIZ_LIST.length,
        title: result.value.title,
        description: result.value.description,
        quizList: [],
        coverImage: null
      });
      this.themeList = THEME_QUIZ_LIST.map(theme => theme.title)
    })
  }
}

