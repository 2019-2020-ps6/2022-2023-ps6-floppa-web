import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Theme } from 'src/models/theme.model';
import Swal from 'sweetalert2';
import { Quiz } from 'src/models/quiz.model';
import { ThemeService } from 'src/services/theme.service';
import { QuizService } from 'src/services/quiz.service';

@Component({
  selector: 'app-theme-editor',
  templateUrl: './theme-editor.component.html',
  styleUrls: ['./theme-editor.component.scss']
})
export class ThemeEditorComponent implements OnInit {
  public themeList: Theme[];

  constructor(private router: Router, private route: ActivatedRoute, public themeService: ThemeService, public quizService: QuizService) {

  }

  ngOnInit(): void {
    this.themeService.getThemes().subscribe((themes) => {
      this.themeList = themes;
      this.themeList.sort((a,b) => a.title.localeCompare(b.title));
    });
  }

  goToTheme(themeIndex: number): void {
    this.router.navigate(["/quiz-editor/" + themeIndex]);
  }
  

  createTheme(): void {
    Swal.fire({
      html: `
      <div style="display:flex;flex-direction:column;align-items:center;">
        <label for="title">
          <div style="display:flex;flex-direction:row;align-items:center;">
            <h3 style="margin-right:10px; font-size:30px">Thème :</h3>
            <input style="height:60px;width:400; border-radius:25px;font-size:25px;padding:10px" type="text" id="title" placeholder="ex: géographie ">
          </div>
        </label>
        <label for="img">
          <div style="display:flex;flex-direction:row;align-items:center;">
            <h3 style="margin-right:10px; font-size:30px">Image :</h3>
            <input style="height:60px;width:400; border-radius:25px;font-size:25px;padding:10px" type="text" id="image" placeholder="URL de l'image">
          </div>
        </label>
      </div>
      `,
      confirmButtonText: 'Valider',
      focusConfirm: false,
      preConfirm: () => {
        const titleInput = Swal.getPopup().querySelector('#title') as HTMLInputElement;
        const imageInput = Swal.getPopup().querySelector('#image') as HTMLInputElement;
        const title = titleInput.value;
        let image = imageInput.value;
        image.trim();
        let themeExists = this.themeList.map(theme => theme.title).find(otherTitle => otherTitle === title) === undefined;
        if (!title) {
          Swal.showValidationMessage("Veuillez saisir un titre pour le thème")
        }
        if(!image|| image === "") {
          image = "/assets/default.png";
        }
        else if (!themeExists) {
          Swal.showValidationMessage("Ce thème existe déjà")
        }
        return { title: title, image: image}
      }
    }).then((result) => {
      let themeToPush: any = {
        title: result.value.title,
        coverImage: result.value.image.replace(/\s+/g, '')
      };

      this.themeService.addTheme(themeToPush);
      this.themeService.getThemes().subscribe((themes) => {
        this.themeList = themes;
        this.themeList.sort((a,b) => a.title.localeCompare(b.title));
      });
    })
  }

  deleteTheme(themeToDelete: Theme): void {
    this.quizService.getQuizData().subscribe((quizzes) => {
      let quizList: Quiz[] = [];
      for (let quiz of quizzes) {
        console.log(quiz.theme);
        console.log(themeToDelete.title);
        console.log(quiz.theme === themeToDelete.title);
        if (quiz.theme === themeToDelete.title) {
          quizList.push(quiz);
        }
      }
      //let quizList = quizzes.filter(quiz => quiz.theme === themeToDelete.title);
      console.log(quizList);
      Swal.fire({
        html: `
          <h2 style="color:white">Êtes-vous sûr de<br>supprimer le Thème<br>"`+themeToDelete.title+`" ?</h2>
          <h3 style="color:white">(`+String(quizList.length)+` quizs vont être supprimés...)</h3>
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
          this.themeService.deleteTheme(themeToDelete);
          this.themeService.getThemes().subscribe((themes) => {
            this.themeList = themes;
            this.themeList.sort((a,b) => a.title.localeCompare(b.title));
          });
          for (let i = 0; i < quizzes.length; i++) {
            if (quizzes[i].theme === themeToDelete.title) {
              this.quizService.deleteQuiz(quizzes[i]);
            }
          }
          window.location.reload();

        }
      });
    })
    
  }
}

