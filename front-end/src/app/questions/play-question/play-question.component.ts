import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../../../models/question.model';
import { Quiz } from '../../../models/quiz.model';
import { QuizService } from '../../../services/quiz.service';
import { User } from 'src/models/user.model';
import { RouterLink } from '@angular/router';
import { newArray } from '@angular/compiler/src/util';
@Component({
  selector: 'app-play-question',
  templateUrl: './play-question.component.html',
  styleUrls: ['./play-question.component.scss']
})
export class PlayQuestionComponent implements OnInit {

  @Input()
  numQuestion: number;

  @Input()
  quiz: Quiz;

  @Input()
  assistance: number;

  @Input()
  user: User;

  public question : Question;

  @Output()
  answer = new EventEmitter<number>();

  @Output()
  nextQuestion = new EventEmitter<void>();

  private hiddenAnswers: boolean[];

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.question = this.quiz.questions[this.numQuestion-1];
    this.hiddenAnswers = new Array(this.question.answers.length);
    for(let i = 0; i < this.hiddenAnswers.length; i++)
      this.hiddenAnswers[i] = false;
  }

  check(indexAnswer: number): void {
    this.answer.emit(indexAnswer);
  }

  goToNextQuestion(): void {
    this.nextQuestion.emit();
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
        img.style.display = "none";
      }
    }
  }
}
