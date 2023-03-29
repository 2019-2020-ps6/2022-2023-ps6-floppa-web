import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../../../models/question.model';
import { Quiz } from '../../../models/quiz.model';
import { QuizService } from '../../../services/quiz.service';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input()
  question: Question;

  @Input()
  quiz: Quiz;

  // @Output()
  // deleteQuestion: EventEmitter<Question> = new EventEmitter<Question>();

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
  }

  delete(): void {
    //this.deleteQuestion.emit(this.question);
    this.quizService.deleteQuestionFromQuiz(this.quiz, this.question);
  }

}
