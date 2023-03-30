import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../../../models/question.model';
import { Quiz } from '../../../models/quiz.model';
import { QuizService } from '../../../services/quiz.service';
@Component({
  selector: 'app-question-choice',
  templateUrl: './question-choice.component.html',
  styleUrls: ['./question-choice.component.scss']
})
export class QuestionChoice implements OnInit {

  @Input()
  numQuestion: number;

  @Input()
  quiz: Quiz;

  public question : Question;

  @Output()
  answer = new EventEmitter<number>();

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.question = this.quiz.questions[this.numQuestion];
  }

  check(indexAnswer: number): void {
    this.answer.emit(indexAnswer);
  }

  remove2Images(): void {
    let rdmnb1 = Math.floor(Math.random() * 3);
    let rdmnb2 = Math.floor(Math.random() * 3);

    if (rdmnb1 === rdmnb2) {
      rdmnb2++;
      if (rdmnb2 > 2)
        rdmnb2 = 0;
    }
    let answers = document.getElementsByClassName('answer');
    for (let i = 0; i < answers.length; i++) {
      let img = answers[i] as HTMLImageElement;
      if (this.quiz.questions[this.numQuestion-1].answers[i].isCorrect) {
        rdmnb1++;
        rdmnb2++;
      }
      else if (i === rdmnb1 || i === rdmnb2) {
        img.src = "/assets/void.png";
      }
    }
  }
}
