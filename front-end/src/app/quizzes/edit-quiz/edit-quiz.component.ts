import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { QUIZ_LIST } from 'src/mocks/quiz-list.mock';
import {THEME_QUIZ_LIST } from 'src/mocks/quiz-list.mock';

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.scss']
})
export class EditQuizComponent implements OnInit {

  public quiz: Quiz;
  public theme: number;

  constructor(private route: ActivatedRoute, private quizService: QuizService) {
    
    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
    
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.quiz = QUIZ_LIST.find(quiz => quiz.id === id);
    this.theme = Number(this.route.snapshot.paramMap.get("themeIndex"));
  }

  selectQuiz(): void {
    this.quizService.setSelectedQuiz(this.quiz.id);
    //this.quizService.quizSelected$.emit(this.quiz.id);
  }

}