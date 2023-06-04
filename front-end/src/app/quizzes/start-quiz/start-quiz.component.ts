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

  constructor(private route: ActivatedRoute, private quizService: QuizService, private location: Location, private questionService: QuestionService) {
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.user = USER_LIST[Number(this.route.snapshot.paramMap.get("userid"))-1]
    this.assistance = Number(this.user.assistance);
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
