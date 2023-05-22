import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { QUIZ_LIST } from 'src/mocks/quiz-list.mock';
import { User } from 'src/models/user.model';
import { USER_LIST } from 'src/mocks/user-list.mock';

@Component({
  selector: 'app-final-screen',
  templateUrl: './final-screen.component.html',
  styleUrls: ['./final-screen.component.scss']
})
export class FinalScreenComponent implements OnInit, OnDestroy {

  public quiz: Quiz;
  public score: number;
  public user: User;
  timer: any;


  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.score = Number(this.route.snapshot.paramMap.get('score'));
    this.quiz = QUIZ_LIST[Number(id)-1]
    let userid = this.route.snapshot.paramMap.get('userid');
    this.user = USER_LIST[Number(userid)-1];
    this.timer = setTimeout(() => {
      this.goHome();
    }, 2*60*1000);
  }

  ngOnDestroy(): void {
      clearInterval(this.timer);
  }

  goHome(): void {
    document.location.href = "/home-profil-choice";
  }
}
