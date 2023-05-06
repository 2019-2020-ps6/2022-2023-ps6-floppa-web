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
    // for (let i = 0; i < QUIZ_LIST.length; i++) {
    //   if (QUIZ_LIST[i].theme === THEME_QUIZ_LIST[this.themeIndex].title) {
    //     this.quizList = THEME_QUIZ_LIST[this.themeIndex].quizList;
    //   }
    // }
    this.quizList = THEME_QUIZ_LIST.find(theme => theme.id === this.themeIndex)?.quizList;
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
        this.quizService.deleteQuiz(quiz, THEME_QUIZ_LIST.find(theme => theme.id === this.themeIndex));
    });
  }
}

