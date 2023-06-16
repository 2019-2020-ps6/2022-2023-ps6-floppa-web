import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from 'src/services/user.service';
import { Theme } from 'src/models/theme.model';
import { ThemeService } from 'src/services/theme.service';

@Component({
  selector: 'app-quiz-editor',
  templateUrl: './quiz-editor.component.html',
  styleUrls: ['./quiz-editor.component.scss']
})

export class QuizEditorComponent implements OnInit {

  public quizList: Quiz[] = [];
  public themeIndex: number;
  public theme: Theme;

  constructor(private router: Router, public quizService: QuizService, private route: ActivatedRoute, public userService: UserService, public themeService: ThemeService) {
  }

  ngOnInit(): void {
    this.themeIndex = Number(this.route.snapshot.paramMap.get("themeIndex"));
    console.log(this.themeIndex);
    this.themeIndex = Number(this.route.snapshot.paramMap.get("themeIndex"));
    this.themeService.getThemes().subscribe((themes) => {
      for (let theme of themes) {
        if (theme.id === this.themeIndex) {
          this.theme = theme;
        }
      }
      this.quizService.getQuizData().subscribe((quizData) => {
        for (let quiz of quizData) {
          if (quiz.theme === this.theme.title) {
            this.quizList.push(quiz);
          }
        }
        this.quizList.sort((a,b) => a.name.localeCompare(b.name));
      })
    })
  }

  editQuiz(quiz: Quiz): void {
    this.router.navigate(['/edit-quiz/' + quiz.name]);
  }

  deleteQuiz(quiz: Quiz): void {
    Swal.fire({
      html: `
        <h2 style="color:white">Êtes-vous sûr de<br>supprimer le Quiz<br>"`+quiz.name+`" ?</h2>
        <img src="/assets/trash.png" alt="trash">
      `,
      background: 'rgb(131,104,96)',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
      focusConfirm: false,
      confirmButtonColor: 'rgb(150,255,150)'
    }).then((result) => {
      if (result.isConfirmed) 
        this.quizService.deleteQuiz(quiz);
        this.refresh();
        window.location.reload();
    });
  }

  refresh(): void {
    this.quizService.getQuizData().subscribe((quizData) => {
      for (let quiz of quizData) {
        if (quiz.theme === this.theme.title) {
          this.quizList.push(quiz);
        }
      }
      this.quizList.sort((a,b) => a.name.localeCompare(b.name));
    })
  }

  createQuiz(): void {
    Swal.fire({
      html: `
      <div style="display:flex;flex-direction:column;align-items:center;">
        <label for="title">
          <div style="display:flex;flex-direction:row;align-items:center;">
            <h3 style="margin-right:10px; font-size:30px">Titre :</h3>
            <input style="height:60px;width:400; border-radius:25px;font-size:25px;padding:10px" type="text" id="title" placeholder="ex: Les félins">
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
        const image = imageInput.value;
        if (!title) {
          Swal.showValidationMessage("Veuillez saisir un titre pour le quiz")
        }
        return { title: title, image: image}
      }
    }).then((result) => {
      let quizToCreate: any = {
        name : result.value.title,
        theme : this.theme.title,
        questions : [],
        associations : [],
        users : [],
        coverImage : result.value.image,
      };
      
      this.quizService.addQuiz(quizToCreate);
      this.refresh();
      window.location.reload();
    })
  }
}

