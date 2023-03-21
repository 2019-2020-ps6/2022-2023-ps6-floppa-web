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
  public answered = false;
  public score = 0;

  constructor(private route: ActivatedRoute, private quizService: QuizService, private location: Location) {
    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
    console.log(this.quiz);
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.quiz = QUIZ_LIST[Number(id)-1]
  }

  check(indexAnswer: number): void {
    if (!this.answered) {
      if (this.quiz.questions[this.numQuestion-1].answers[indexAnswer-1].isCorrect) {
          document.getElementById('answer-label').innerHTML = "Bonne réponse";
          this.score++;
      }
      else {
          document.getElementById('answer-label').innerHTML = "Mauvaise réponse";
      }
      document.getElementById('next-question-button').style.display="block";
    }
    this.answered = true;
  }

  nextQuestion(): void {
    document.getElementById('next-question-button').style.display="none"
    if (this.answered) {
      this.numQuestion++;
      if (this.numQuestion > this.quiz.questions.length) {
        document.location.href = '/final-screen/' + this.quiz.id;
      }
      this.update();
    }
  }

  update(): void {
    document.getElementById('answer-label').innerHTML = "";
    let answers = document.getElementsByClassName('answer');
    for (let i = 0; i < answers.length; i++) {
      let img = answers[i] as HTMLImageElement;
      img.src = "/assets/quiz-" + this.quiz.id + "/question-" + this.numQuestion + "/img-" + (i+1) + ".jpg";
    }
    this.answered = false;
  }
}
