import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import { User } from 'src/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { Theme } from 'src/models/theme.model';
import { UserService } from 'src/services/user.service';
import { ThemeService } from 'src/services/theme.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})

// QUIZ EDITOR
export class QuizListComponent implements OnInit {

  public userList: User[];
  public user: User;
  public username: string;
  public quizList: Quiz[] = [];
  public themeIndex: number;
  public type: string;
  public theme: Theme;
  public themeList: Theme[];

  constructor(private router: Router, public quizService: QuizService,private route: ActivatedRoute, public userService: UserService, public themeService: ThemeService) {
    this.username = this.route.snapshot.paramMap.get("user");
    this.type = this.route.snapshot.paramMap.get("type");
    this.userService.getUsers().subscribe((users) => {
      this.userList = users;
      this.getUser(this.username);
    })
    this.themeIndex = Number(this.route.snapshot.paramMap.get("themeIndex"));
    this.themeService.getThemes().subscribe((themes) => {
      this.themeList = themes;
      for (let theme of this.themeList) {
        if (Number(theme.id) === Number(this.themeIndex)) {
          this.theme = theme;
        }
      }
      this.quizService.getQuizData().subscribe((quizData) => {
        for (let quiz of quizData) {
          if (quiz.theme === this.theme.title) {
            this.quizList.push(quiz);
          }
        }
      })
    });
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

  startQuiz(quiz: Quiz): void {
    this.router.navigate(['/start-quiz/' + quiz.name + '/' + this.user.id]);
  }
}

