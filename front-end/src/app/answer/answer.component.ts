import { Component, OnInit, Input, Output, EventEmitter, ViewChild, NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { QUIZ_LIST } from 'src/mocks/quiz-list.mock';
import { Location, CommonModule } from '@angular/common';
import { PlayQuestionComponent } from 'src/app/questions/play-question/play-question.component';
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
  public correctAnswer: number;
  public assistance: number;

  constructor(private route: ActivatedRoute, private quizService: QuizService, private location: Location) {
    
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.quiz = QUIZ_LIST[Number(id)-1];
    this.numQuestion = Number(this.route.snapshot.paramMap.get('numQuestion'));
    this.score = Number(this.route.snapshot.paramMap.get('score'));
    if (this.route.snapshot.paramMap.get('isCorrect') === 'true') {
        this.isCorrect = true;
        this.score++;
    }
    else {
        this.isCorrect = false;
    }
    if(this.numQuestion <= this.quiz.questions.length)
      this.correctAnswer = this.getCorrectAnswer();
      
    this.assistance = Number(this.route.snapshot.paramMap.get('assistance'));
    setTimeout(() => {
      if (this.numQuestion+1 > this.quiz.questions.length) {
        document.location.href = '/final-screen/' + this.quiz.id + '/' + this.score + "/" + this.assistance;
      }
      else {
        document.location.href = "/play-quiz/" + this.quiz.id + "/" + this.score + "/" + (this.numQuestion+1) + "/" + this.assistance;
      }
    }, 2 * 60 * 1000);
  }

  getCorrectAnswer(): number {
    for (let i = 0; i < this.quiz.questions[this.numQuestion-1].answers.length; i++) {
      if (this.quiz.questions[this.numQuestion-1].answers[i].isCorrect) {
        return i;
      }
    }
    return 0;
  }

  nextQuestion(): void {
    if (this.numQuestion+1 > this.quiz.questions.length + this.quiz.associations.length) {
      document.location.href = '/final-screen/' + this.quiz.id + '/' + this.score + "/" + this.assistance;
    }
    else {
      document.location.href = "/play-quiz/" + this.quiz.id + "/" + this.score + "/" + (this.numQuestion+1) + "/" + this.assistance;
    }
  }
}