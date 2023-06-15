import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { QUIZ_LIST } from 'src/mocks/quiz-list.mock';
import {Location} from '@angular/common';
import { USER_LIST } from 'src/mocks/user-list.mock';
import { User } from 'src/models/user.model';
import { Question } from 'src/models/question.model';
import { QuestionService } from 'src/services/question.service';
import { UserService } from 'src/services/user.service';
import { Association } from 'src/models/association.model';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.scss']
})
export class StartQuizComponent implements OnInit {

  public quiz: Quiz;
  public assistance: number;
  public user: User;
  public quizQuestions: Question[];
  public quizAssociations: Association[];

  constructor(private route: ActivatedRoute, private quizService: QuizService, private location: Location, private questionService: QuestionService, public userService: UserService) {
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    let userid = this.route.snapshot.paramMap.get('userid');
    this.userService.getUsers().subscribe((users) => {
      for (let userInList of users) {
        if (Number(userInList.id) === Number(userid)) this.setUser(userInList);
      }
    })
    this.quizService.getQuizData().subscribe((quizData) => {
      console.log(quizData);
      for (let quiz of quizData) {
        if (Number(quiz.id) === Number(id)) {
          this.setQuiz(quiz);
        }
      }
    })
    this.questionService.getQuestions(Number(id)).subscribe((questions) => {
      this.quizQuestions = questions;
    })
    this.questionService.getAssociations(Number(id)).subscribe((associations) => {
      this.quizAssociations = associations;
    })
    this.createSession();
  }

  setQuiz(quizToSet: Quiz) {
    this.quiz = quizToSet;
    console.log(this.quiz);
  }

  setUser(userToSet: User) {
    this.user = userToSet;
    this.assistance = Number(this.user.assistance);
  }

  goBack():void {
    this.location.back();
  }

  createSession():void {
    this.userService.createQuizSession(this.user,this.quiz);
  }
}
