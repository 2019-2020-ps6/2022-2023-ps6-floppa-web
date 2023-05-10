import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { QUIZ_LIST } from 'src/mocks/quiz-list.mock';
import {THEME_QUIZ_LIST } from 'src/mocks/quiz-list.mock';
import { User } from 'src/models/user.model';
import { USER_LIST } from 'src/mocks/user-list.mock';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.scss']
})
export class EditQuizComponent implements OnInit {

  public quiz: Quiz;
  public theme: number;
  public users: string[];
  public userList: User[];
  public remainingUsers: User[];

  constructor(private route: ActivatedRoute, private quizService: QuizService) {
    
    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
    
  }

  ngOnInit(): void {
    console.log(USER_LIST);
    const id = this.route.snapshot.paramMap.get('id');
    this.quiz = QUIZ_LIST.find(quiz => quiz.id === id);
    this.theme = Number(this.route.snapshot.paramMap.get("themeIndex"));
    this.retrieveUsers();
  }

  retrieveUsers(): void {
    this.users = this.quiz.users;
    this.userList = [];
    for (let userid of this.users) {
      this.userList.push(USER_LIST[Number(userid)-1])
    }
    
    this.remainingUsers = USER_LIST.slice();
    let indexToDel: number[] = []
    for (let i = 0; i < this.remainingUsers.length; i++) {
      for (let j = 0; j < this.userList.length; j++) {
        if (this.remainingUsers[i]===this.userList[j]) {
          indexToDel.unshift(i);
        }
      }
    }
    for (let i of indexToDel) {
      this.remainingUsers.splice(i,1);
    }
  }

  selectQuiz(): void {
    this.quizService.setSelectedQuiz(this.quiz.id);
    //this.quizService.quizSelected$.emit(this.quiz.id);
  }

  displayUserToAdd(): void {
    let userToAdd = document.getElementById("user-to-add") as HTMLElement;
    if (userToAdd.style.display==='none') {
      userToAdd.style.display = 'flex';
    }
    else {
      userToAdd.style.display = 'none';
    }
  }

  addUserToQuiz(user: User): void {
    this.quiz.users.push(user.id);
    this.retrieveUsers();
  }

  removeUserToQuiz(user: User): void {
    let indexToDel:number;
    for (let i = 0; i < this.quiz.users.length; i++) {
      if (this.quiz.users[i]===user.id) {
        indexToDel = i;
      }
    }
    this.quiz.users.splice(indexToDel,1);
    this.retrieveUsers();
  }
}