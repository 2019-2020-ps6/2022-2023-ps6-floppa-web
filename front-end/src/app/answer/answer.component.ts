import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { QUIZ_LIST } from 'src/mocks/quiz-list.mock';
import { Location } from '@angular/common';
import { QuestionChoice } from 'src/app/questions/question-choice/question-choice.component';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
  public quiz: Quiz;
  public isCorrect: boolean;
  public score: number;
  public numQuestion: number;

  constructor(private route: ActivatedRoute, private quizService: QuizService, private location: Location) {
    
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.quiz = QUIZ_LIST[Number(id)-1];
    this.numQuestion = Number(this.route.snapshot.paramMap.get('numQuestion'));
    if (this.route.snapshot.paramMap.get('isCorrect') === 'true') {
        this.isCorrect = true;
    }
    else {
        this.isCorrect = false;
    }
    this.score = Number(this.route.snapshot.paramMap.get('score'));
  }
}