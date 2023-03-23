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
  score: number;

  constructor(private route: ActivatedRoute, private quizService: QuizService) {
    this.score = this.quizService.getScore();
  }

  ngOnInit(): void {
    console.log(this.quizService.getScore());
    let id = this.route.snapshot.paramMap.get('id');
    this.quiz = QUIZ_LIST[Number(id)-1]
  }

  goHome(): void {
    document.location.href = "/quiz-list";
  }
}
