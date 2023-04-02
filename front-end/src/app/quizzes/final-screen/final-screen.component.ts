import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { QUIZ_LIST } from 'src/mocks/quiz-list.mock';

@Component({
  selector: 'app-final-screen',
  templateUrl: './final-screen.component.html',
  styleUrls: ['./final-screen.component.scss']
})
export class FinalScreenComponent implements OnInit {

  public quiz: Quiz;
  public score: number;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.score = Number(this.route.snapshot.paramMap.get('score'));
    this.quiz = QUIZ_LIST[Number(id)-1]
    setTimeout(() => {
      this.goHome();
    }, 2*60*1000);
  }

  goHome(): void {
    document.location.href = "/home-profil-choice";
  }
}
