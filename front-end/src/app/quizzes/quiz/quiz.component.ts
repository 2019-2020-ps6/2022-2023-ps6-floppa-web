import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Quiz } from '../../../models/quiz.model';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  @Input()
  quiz: Quiz;

  @Input()
  user: User;

  @Input()
  type: string;

  @Output()
  startQuiz: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  @Output()
  editQuiz: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  @Output()
  deleteQuiz: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  constructor() {
  }

  ngOnInit(): void {
  }

  start(): void {
    document.location.href = "/start-quiz/" + this.quiz.id + "/" + this.user.id
  }

  edit(): void {
    this.editQuiz.emit(this.quiz);
  }

  delete(): void {
    this.deleteQuiz.emit(this.quiz);
  }

  goToQuizStats(): void {
    document.location.href = "/user-quiz-stats/" + this.user.firstName + "-" + this.user.lastName + "/" + this.quiz.id;
  }
}
