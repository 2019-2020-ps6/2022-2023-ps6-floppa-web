import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { QUIZ_LIST } from 'src/mocks/quiz-list.mock';
import {Location} from '@angular/common';
import { USER_LIST } from 'src/mocks/user-list.mock';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.scss']
})
export class StartQuizComponent implements OnInit {

  public quiz: Quiz;
  public assistance: number;
  public user: User;

  constructor(private route: ActivatedRoute, private quizService: QuizService, private location: Location) {
    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.user = USER_LIST[Number(this.route.snapshot.paramMap.get("userid"))-1]
    this.assistance = Number(this.user.assistance);
    this.quiz = QUIZ_LIST[Number(id)-1]
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
