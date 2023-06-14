import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';
import { QuestionService } from 'src/services/question.service';
import { Association } from 'src/models/association.model';
import { Question } from 'src/models/question.model';

@Component({
  selector: 'app-final-screen',
  templateUrl: './final-screen.component.html',
  styleUrls: ['./final-screen.component.scss']
})
export class FinalScreenComponent implements OnInit, OnDestroy {

  public quiz: Quiz;
  public score: number;
  public user: User;
  public quizAssociations: Association[];
  public quizQuestions: Question[];
  timer: any;


  constructor(private route: ActivatedRoute, public quizService: QuizService, public userService: UserService, public questionService: QuestionService) {
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.score = Number(this.route.snapshot.paramMap.get('score'));
    this.quizService.getQuizData().subscribe((quizData) => {
      for (let quiz of quizData) {
        if (Number(quiz.id) === Number(id)) {
          this.quiz = quiz;
        }
      }
    })
    this.questionService.getQuestions(Number(id)).subscribe((questions) => {
      this.quizQuestions = questions;
    })
    this.questionService.getAssociations(Number(id)).subscribe((associations) => {
      this.quizAssociations = associations;
    })
    let userid = this.route.snapshot.paramMap.get('userid');
    this.userService.getUsers().subscribe((users) => {
      for (let userInList of users) {
        if (Number(userInList.id) === Number(userid)) this.user = userInList;
      }
    })
    this.timer = setTimeout(() => {
      this.goHome();
    }, 2*60*1000);
  }

  ngOnDestroy(): void {
      clearInterval(this.timer);
  }

  goHome(): void {
    document.location.href = "/home-profil-choice";
  }
}
