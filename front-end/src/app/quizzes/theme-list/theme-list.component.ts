import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import { User } from 'src/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { USER_LIST } from 'src/mocks/user-list.mock';
import { THEME_QUIZ_LIST } from 'src/mocks/quiz-list.mock';

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.scss']
})
export class ThemeListComponent implements OnInit {

  public userList: User[];
  public user: User;
  public username: string;
  public themeList: string[];
  public type: string;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.username = this.route.snapshot.paramMap.get("user");
    this.type = this.route.snapshot.paramMap.get("type");
    this.userList = USER_LIST;
    this.getUser(this.username);

    this.themeList = [];
    
    for(let i = 0; i < THEME_QUIZ_LIST.length; i++) {
      this.themeList.push(THEME_QUIZ_LIST[i].title);
    }
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

  goToTheme(themeIndex: number): void {
    this.router.navigate(["/quiz-list/" + this.user.firstName + "-" + this.user.lastName + "/" + themeIndex + "/" + this.type]);
  }
}

