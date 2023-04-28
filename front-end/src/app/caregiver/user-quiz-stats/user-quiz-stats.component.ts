import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { USER_LIST } from 'src/mocks/user-list.mock';
import { User } from 'src/models/user.model';
import { QUIZ_LIST } from 'src/mocks/quiz-list.mock';
import { Quiz } from 'src/models/quiz.model';

@Component({
  selector: 'app-user-stats',
  templateUrl: './user-quiz-stats.component.html',
  styleUrls: ['./user-quiz-stats.component.scss']
})
export class UserQuizStatsComponent implements OnInit {

    public userList: User[];
    public username: string;
    public user: User;
    public numberTry: number = 0;
    public id: string;
    public lastGame: number;
    public meanScore: number;
    public quiz: Quiz;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.username = this.route.snapshot.paramMap.get("user");
    this.id = this.route.snapshot.paramMap.get("id");
    this.quiz = QUIZ_LIST[Number(this.id)-1];
    this.userList = USER_LIST;
    this.getUser(this.username);
    this.getStats();
  }

  ngOnInit(): void {
  }

  getUser(username: string): void {
    for (let user of this.userList) {
      if (user.firstName + "-" + user.lastName === username) {
        this.user = user;
      }
    }
  }

  getStats(): void {
    const today = new Date().getTime();
    let score = 0;
    this.lastGame = Number.MAX_VALUE;
    for (const session of Object.values(this.user.quizSessions)) {
      if (session.quizId === this.id) {
        score += this.computeScore(session.answers);
        const diff = Math.abs(today - session.date) / (86400000);
        if (diff < this.lastGame) {
            this.lastGame = Math.round(diff);
        }
        this.numberTry++;
      }
    }
    this.meanScore = score/this.numberTry;
  }

  computeScore(answers: boolean[]): number {
    let score = 0;
    for (const answer of answers) {
      if (answer) score++;
    }
    return Math.round(score*100/answers.length);
  }
}