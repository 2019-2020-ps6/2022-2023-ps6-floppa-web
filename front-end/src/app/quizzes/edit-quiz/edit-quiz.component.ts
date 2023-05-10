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
    this.quiz = QUIZ_LIST[Number(id) - 1];
    //this.theme = Number(this.route.snapshot.paramMap.get("themeIndex"));

    //this.quiz = THEME_QUIZ_LIST.find(theme => theme.id === this.theme)?.quizList.find(quiz => quiz.id === id);
    for (let i = 0; i < THEME_QUIZ_LIST.length; i++) {
      if (THEME_QUIZ_LIST[i].title === this.quiz.theme) {
        this.theme = i;
      }
    }
  }

  selectQuiz(): void {
    this.quizService.setSelectedQuiz(this.quiz.id);
    //this.quizService.quizSelected$.emit(this.quiz.id);
  }

}