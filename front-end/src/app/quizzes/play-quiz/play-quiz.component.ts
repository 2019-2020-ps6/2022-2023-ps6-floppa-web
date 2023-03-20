import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { QUIZ_LIST } from 'src/mocks/quiz-list.mock';
import { Location } from '@angular/common';


@Component({
  selector: 'app-start-quiz',
  templateUrl: './play-quiz.component.html',
  styleUrls: ['./play-quiz.component.scss']
})
export class PlayQuizComponent implements OnInit {

  public quiz: Quiz;
  public numQuestion: number = 1;
  public lb = document.getElementById('answer-label');

  constructor(private route: ActivatedRoute, private quizService: QuizService, private location: Location) {
    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
    console.log(this.quiz);
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.quiz = QUIZ_LIST[Number(id)-1]
  }

  check(indexAnswer: number): void {
    if (this.quiz.questions[this.numQuestion-1].answers[indexAnswer-1].isCorrect) {
        document.getElementById('answer-label').innerHTML = "Vrai";
    }
    else {
        document.getElementById('answer-label').innerHTML = "Faux";
    }
    //console.log(this.quiz.questions[this.numQuestion-1].answers[indexAnswer-1].isCorrect);
  }

  nextQuestion(): void {
    this.numQuestion++;
  }
}
