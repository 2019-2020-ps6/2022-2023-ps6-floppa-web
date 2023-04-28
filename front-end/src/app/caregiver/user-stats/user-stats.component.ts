import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { USER_LIST } from 'src/mocks/user-list.mock';
import { User } from 'src/models/user.model';
import { QUIZ_LIST } from 'src/mocks/quiz-list.mock';

@Component({
  selector: 'app-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.scss']
})
export class UserStatsComponent implements OnInit {

    public userList: User[];
    public username: string;
    public user: User;
    public numberPlayed: number;
    public lastGame: number;
    public favoriteQuiz: string;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.username = this.route.snapshot.paramMap.get("user");
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
    this.numberPlayed = Object.keys(this.user.quizSessions).length;
    const today = new Date().getTime();
    this.lastGame = Number.MAX_VALUE;

    // count quiz sessions for each quizId
    const quizIdCount = {};
    for (const session of Object.values(this.user.quizSessions)) {
        const diff = Math.abs(today - session.date) / (86400000);
        if (diff < this.lastGame) {
            this.lastGame = Math.round(diff);
        }
        const quizId = session.quizId;
        if (quizIdCount[quizId]) {
            quizIdCount[quizId]++;
        } else {
            quizIdCount[quizId] = 1;
        }
    }

    // find quizId with the most quiz sessions
    let maxCount = 0;
    let mostFrequentQuizId;
    for (const quizId of Object.keys(quizIdCount)) {
        if (quizIdCount[quizId] > maxCount) {
            maxCount = quizIdCount[quizId];
            mostFrequentQuizId = quizId;
        }
    }

    this.favoriteQuiz = QUIZ_LIST[mostFrequentQuizId - 1].name;
}
}