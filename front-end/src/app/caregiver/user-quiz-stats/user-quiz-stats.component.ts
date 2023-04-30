import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { USER_LIST } from 'src/mocks/user-list.mock';
import { User } from 'src/models/user.model';
import { QUIZ_LIST } from 'src/mocks/quiz-list.mock';
import { Quiz } from 'src/models/quiz.model';
import { ChartOptions, ChartDataSets, ChartType } from 'chart.js';
import { Label } from 'ng2-charts/lib/base-chart.directive';

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
    public progression: number;
    public barChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true,
      title: {
        display: true,
        text: 'Score'
      },
      legend: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            max: 100,
          }
        }]
      },
      hover: {
        mode: null
      }
    };
    
    public barChartLabels: Label[] = [];
    public barChartType: ChartType = 'bar';
    public barChartPlugins = [];

    public barChartData: ChartDataSets[] = [{ data: [], label: 'Score', backgroundColor: []}];
    public colors: string[] = [];
    

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
    const scoreByDay: Record<number, number[]> = {};

    const sortedQuizSessions = Object.keys(this.user.quizSessions) //croissant => date + récente en dernier
      .sort((a,b) => this.user.quizSessions[a].date - this.user.quizSessions[b].date)
      .reduce((acc,key) => {
        acc[key] = this.user.quizSessions[key];
        return acc;
      },{});
    this.user.quizSessions = sortedQuizSessions;
    this.lastGame = Number.MAX_VALUE;
    for (const session of Object.values(this.user.quizSessions)) {
      if (session.quizId === this.id) {
        score += this.computeScore(session.answers);
        const diff = Math.round(Math.abs(today - session.date) / (86400000));
        if (diff < this.lastGame) {
            this.lastGame = diff;
        }
        if (scoreByDay[diff]) {
          scoreByDay[diff].push(this.computeScore(session.answers));
        }
        else {
          scoreByDay[diff] = [this.computeScore(session.answers)];
        }
        this.numberTry++;
      }
    }
    this.meanScore = score/this.numberTry;

    const scoresByDayObj = {};
    Object.keys(scoreByDay).forEach((diff) => {
      const meanScore = scoreByDay[diff].reduce((acc, val) => acc + val, 0) / scoreByDay[diff].length;
      scoresByDayObj[diff] = meanScore;
    });
    this.progression = this.computeProgression(scoresByDayObj);
  }

  computeScore(answers: boolean[]): number {
    let score = 0;
    for (const answer of answers) {
      if (answer) score++;
    }
    return Math.round(score*100/answers.length);
  }

  computeProgression(scoresByDayObj: {}): number {
    console.log(scoresByDayObj);
    let sumOfScoreDiffs = 0;
    let attempts = 0;
    Object.values(scoresByDayObj).forEach((score,i,scoresArray) => {
      if (i>0) {
        sumOfScoreDiffs += Number(scoresArray[i-1]) - Number(score);
        attempts++;
      }
      if (Number(score)>90) this.colors.unshift('rgb(75,229,98)');
      else if (Number(score)>80) this.colors.unshift('rgb(120,229,87)');
      else if (Number(score)>70) this.colors.unshift('rgb(157,229,87)');
      else if (Number(score)>60) this.colors.unshift('rgb(178,229,87)');
      else if (Number(score)>50) this.colors.unshift('rgb(198,229,87)');
      else if (Number(score)>40) this.colors.unshift('rgb(255,229,87)');
      else if (Number(score)>30) this.colors.unshift('rgb(255,197,99)');
      else if (Number(score)>20) this.colors.unshift('rgb(255,132,91)');
      else if (Number(score)>10) this.colors.unshift('rgb(255,93,81)');
      else this.colors.unshift('rgb(255,48,62)')
      let date = new Date();
      date.setDate(date.getDate() - Number(Object.keys(scoresByDayObj)[i]));
      let formattedDate = date.toLocaleDateString();
      this.barChartLabels.unshift(formattedDate);
      this.barChartData[0].data.unshift(Number(score));
    });
    this.barChartData[0].backgroundColor = this.colors;
    if (attempts > 0) {
      return Math.round(sumOfScoreDiffs / attempts);
    }
    else {
      return 0;
    }
  }
}