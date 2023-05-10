import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import { User } from 'src/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { USER_LIST } from 'src/mocks/user-list.mock';
import { QUIZ_LIST, THEME_QUIZ_LIST } from 'src/mocks/quiz-list.mock';

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

  constructor(private router: Router, public quizService: QuizService,private route: ActivatedRoute) {
    this.username = this.route.snapshot.paramMap.get("user");
    this.type = this.route.snapshot.paramMap.get("type");
    this.userList = USER_LIST;
    this.getUser(this.username);
    this.themeIndex = Number(this.route.snapshot.paramMap.get("themeIndex"));
    for (let i=0; i<QUIZ_LIST.length; i++) {
      if (THEME_QUIZ_LIST[this.themeIndex].title === QUIZ_LIST[i].theme) {
        this.quizList.push(QUIZ_LIST[i]);
      }
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

  startQuiz(quiz: Quiz): void {
    this.router.navigate(['/start-quiz/' + quiz.name + '/' + this.user.id]);
  }
}

