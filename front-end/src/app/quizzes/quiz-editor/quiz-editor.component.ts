import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import { User } from 'src/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { USER_LIST } from 'src/mocks/user-list.mock';
import { QUIZ_LIST } from 'src/mocks/quiz-list.mock';
import { THEME_QUIZ_LIST } from 'src/mocks/quiz-list.mock';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz-editor',
  templateUrl: './quiz-editor.component.html',
  styleUrls: ['./quiz-editor.component.scss']
})

export class QuizEditorComponent implements OnInit {

  public userList: User[];
  public quizList: Quiz[] = [];
  public themeIndex: number;

  constructor(private router: Router, public quizService: QuizService,private route: ActivatedRoute) {
    this.userList = USER_LIST;
    this.themeIndex = Number(this.route.snapshot.paramMap.get("themeIndex"));
    this.quizList = QUIZ_LIST.filter(quiz => quiz.theme === THEME_QUIZ_LIST.find(theme => theme.id === this.themeIndex).title);
    console.log(this.quizList);
  }

  ngOnInit(): void {
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
    });
  }

  refresh(): void {
    this.quizList = QUIZ_LIST.filter(quiz => quiz.theme === THEME_QUIZ_LIST.find(theme => theme.id === this.themeIndex).title);
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
      let newQuizId = 0;
      for (let quiz of QUIZ_LIST) {
        if (newQuizId < Number(quiz.id)) {
          newQuizId = Number(quiz.id);
        }
      }
      let quizToCreate: Quiz = {
        id : (newQuizId+1) + "",
        name : result.value.title,
        theme : THEME_QUIZ_LIST.find(theme => theme.id === this.themeIndex).title,
        questions : [],
        associations : [],
        users : [],
        coverImage : result.value.image,
      };
      
      QUIZ_LIST.push(quizToCreate);
      this.refresh();
      console.log(QUIZ_LIST);
    })
  }
}

