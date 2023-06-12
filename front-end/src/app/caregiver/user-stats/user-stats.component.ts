import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { USER_LIST } from 'src/mocks/user-list.mock';
import { User } from 'src/models/user.model';
import { QUIZ_LIST } from 'src/mocks/quiz-list.mock';
import { UserService } from 'src/services/user.service';
import { QuizService } from 'src/services/quiz.service';
import { Quiz } from 'src/models/quiz.model';

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
    public quizList: Quiz[];

  constructor(private router: Router, private route: ActivatedRoute, public userService: UserService, public quizService: QuizService) {
  }

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get("user");
    this.userService.getUsers().subscribe((users) => {
      this.userList = users;
      this.getUser(this.username);
      this.quizService.getQuizData().subscribe((quizData) => {
        this.quizList = quizData;
        this.getStats();
      })
    })
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
      if (this.numberPlayed !== 0) {
      const today = new Date().getTime();
      this.lastGame = Number.MAX_VALUE;

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

      let maxCount: number = 0;
      let mostFrequentQuizId: any;
      for (const quizId of Object.keys(quizIdCount)) {
          if (quizIdCount[quizId] > maxCount) {
              maxCount = quizIdCount[quizId];
              mostFrequentQuizId = quizId;
          }
      }

      console.log(mostFrequentQuizId);
      for (let quiz of this.quizList) {
        if (Number(quiz.id) === Number(mostFrequentQuizId)) {
          this.favoriteQuiz = quiz.name;
        }
      }
    }
  }
}