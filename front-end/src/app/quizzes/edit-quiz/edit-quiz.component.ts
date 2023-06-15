import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';
import Swal from 'sweetalert2';
import { QuestionService } from 'src/services/question.service';
import { Question } from 'src/models/question.model';
import { Association } from 'src/models/association.model';

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.scss']
})
export class EditQuizComponent implements OnInit {

  public quiz: Quiz;
  public quizQuestions: Question[];
  public quizAssociations: Association[];
  public theme: number;
  public users: string[] = [];
  public userList: User[];
  public userListQuiz: User[] = [];
  public remainingUsers: User[];
  public associations: Association[];

  constructor(private route: ActivatedRoute, private quizService: QuizService, private router: Router, public userService: UserService, public questionService: QuestionService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.getQuizData().subscribe((quizData) => {
      for (let quiz of quizData) {
        if (Number(quiz.id) === Number(id)) {
          this.quiz = quiz;
          this.questionService.getAssociations(Number(this.quiz.id)).subscribe((associations) => {
            this.associations = associations;
          });
          this.userService.getUsers().subscribe((users) => {
            this.userList = users;
            this.userList.sort((a,b) => a.lastName.localeCompare(b.lastName));
            this.retrieveUsers();
          })
        }
      }
    })
    console.log(this.quiz);
    this.questionService.getQuestions(Number(id)).subscribe((questions) => {
      this.quizQuestions = questions;
    })
    this.questionService.getAssociations(Number(id)).subscribe((associations) => {
      this.quizAssociations = associations;
    })
    this.theme = Number(this.route.snapshot.paramMap.get("themeIndex"));
  }

  getUserWithId(userId: number): User {
    for (let user of this.userList) {
      if (Number(user.id) === userId) return user;
    }
  }

  retrieveUsers(): void {
    this.users = this.quiz.users;
    for (let userid of this.users) {
      this.userListQuiz.push(this.getUserWithId(Number(userid)));
    }
    
    this.userService.getUsers().subscribe((users) => {
      this.remainingUsers = users;
      let indexToDel: number[] = [];
      for (let i = 0; i < this.remainingUsers.length; i++) {
        for (let j = 0; j < this.userListQuiz.length; j++) {
          if (this.areObjectsEqual(this.remainingUsers[i],this.userListQuiz[j])) {
            indexToDel.unshift(i);
          }
        }
      }
      for (let i of indexToDel) {
        this.remainingUsers.splice(i,1);
      }
    })
  }

  areObjectsEqual(obj1: any, obj2: any): boolean {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (let key of keys1) {
      if (Array.isArray(obj1[key]) && Array.isArray(obj2[key])) {
        const arr1 = JSON.stringify(obj1[key]);
        const arr2 = JSON.stringify(obj2[key]);
        if (arr1 !== arr2) {
          return false;
        }
      } else {
        if (obj1[key] !== obj2[key]) {
          return false;
        }
      }
    }
    return true;
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
    this.quizService.addUserToQuiz(this.quiz, user);
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
    this.quizService.removeUserToQuiz(this.quiz);
    this.retrieveUsers();
  }

  createElement(): void {
    Swal.fire({
      html: `
      <div class="parent-div">
      <div class="button-container" style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <div style="display: flex; flex-direction: row;">
          <button id="createQuestionBtn" class="button" style="margin: 10px; font-size:20px;">Créer Question</button>
          <img src="assets/question_choice.png" style="max-width: 200px;margin-left: 50px;">
        </div>
        <div style="display: flex; flex-direction: row; margin-top: 20px;">
          <button id="createAssociationBtn" class="button" style="margin-right: 50px; font-size:20px;">Créer Association</button>
          <img src="assets/association.png">
        </div>
      </div>
    </div>
      `,confirmButtonText: 'Fermer',
      didOpen: () => {
        const createQuestionBtn = document.getElementById('createQuestionBtn');
        const createAssociationBtn = document.getElementById('createAssociationBtn');
        createQuestionBtn.addEventListener('click', () => {
          this.navigateToQuestion(() => {
            Swal.close();
          });
        });
        createAssociationBtn.addEventListener('click', () => {
          this.navigateToAssociation(() => {
            Swal.close();
          });
        });
      }
    });
  }
  
  navigateToQuestion(callback: () => void): void {
    this.router.navigate([`/question-form/${this.theme}/${this.quiz.id}`])
      .then(() => {
        callback();
      });
  }

  navigateToAssociation(callback: () => void): void {
    this.router.navigate([`/association-form/${this.theme}/${this.quiz.id}`])
      .then(() => {
        callback();
      });
  }
}