import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Quiz } from '../../../models/quiz.model';
import { User } from 'src/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  @Input()
  themeIndex: number;

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

  constructor(private router: Router,) {
  }

  ngOnInit(): void {
  }

  onQuizClicked(): void {
    if(this.type == 'play')
    {
        this.start();
    } 
    else if(this.type == 'stats')
    {
        this.goToQuizStats();
    }
  }

  start(): void {
    this.router.navigate(["/start-quiz/" + this.quiz.id + "/" + this.user.id]);
  }

  edit(): void {
    this.editQuiz.emit(this.quiz);
  }

  delete(): void {
    this.deleteQuiz.emit(this.quiz);
  }

  goToQuizStats(): void {
    this.router.navigate([document.location.href = "/user-quiz-stats/" + this.user.firstName + "-" + this.user.lastName + "/" + this.quiz.id]);
  }
}
