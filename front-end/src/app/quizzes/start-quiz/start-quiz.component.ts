import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { QUIZ_LIST } from 'src/mocks/quiz-list.mock';
import {Location} from '@angular/common';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.scss']
})
export class StartQuizComponent implements OnInit {

  public quiz: Quiz;
  public assistance: number;

  constructor(private route: ActivatedRoute, private quizService: QuizService, private location: Location) {
    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.assistance = Number(this.route.snapshot.paramMap.get("assistance"));
    this.quiz = QUIZ_LIST[Number(id)-1]
  }

  goBack():void {
    this.location.back();
  }

}
