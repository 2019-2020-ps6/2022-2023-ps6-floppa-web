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
    let newId = 0;
    for (let id in this.user.quizSessions) {
      if (Number(id) > newId) newId = Number(id);
    }
    this.user.quizSessions[newId+1] = {
      date: new Date().getTime(),
      quizId: this.quiz.id,
      answers: [],
      timePerQuestion: []
    };
  }
}
