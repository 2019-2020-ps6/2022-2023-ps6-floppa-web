import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { QuizSession, User } from '../models/user.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import { ThisReceiver } from '@angular/compiler';
import { UserEditComponent } from 'src/app/users/user-edit/user-edit.component';
import { USER_LIST } from 'src/mocks/user-list.mock';
import { Quiz } from 'src/models/quiz.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  /*
   The list of user.
   */
  private users: User[] = USER_LIST;

  /*
   Observable which contains the list of the user.
   */
  public users$: BehaviorSubject<User[]>
    = new BehaviorSubject([]);

  public userSelected$: Subject<User> = new Subject();

  private userUrl = serverUrl + '/users';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.retrieveUsers();
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>("http://localhost:9428/api/users");
  }

  retrieveUsers(): void {
    this.users$.next(this.users);
  }

  getUser(userId: string): Observable<User> {
    const urlWithId = this.userUrl + '/' + userId;
    return this.http.get<User>("http://localhost:9428/api/users");
  }

  addUser(user: User): void {
    console.log(user);
    this.http.post<User>(this.userUrl, user, this.httpOptions).subscribe(() => this.retrieveUsers());
    this.users.push(user);
    this.users$.next(this.users);
  }

  setSelectedUser(userId: string): void {
    this.users$.subscribe((users) => {
      const user = users.filter(user => user.id === userId)[0];
      this.userSelected$.next(user);
      console.log("user: ", user);
    });
  }

  deleteUser(user: User): void {
    const urlWithId = this.userUrl + '/' + user.id;
    this.http.delete<User>(urlWithId, this.httpOptions).subscribe(() => this.retrieveUsers());
    for (let i=0; i<this.users.length; i++){
      if (this.users[i] == user){
        this.users.splice(i, 1);
      }
    }
  }

  edit(user: User): void{
    console.log(user);
    console.log(user.id);
    const index = parseInt(user.id)-1;
    console.log(index);
    if (parseInt(user.id)-1 >= 0) {
      console.log("hello");
      this.users[index].firstName = user.firstName;
      this.users[index].lastName = user.lastName;
      this.users[index].alzheimerStade = user.alzheimerStade;
      this.users[index].assistance = user.assistance;
      this.users[index].photo = user.photo;
      this.users[index].timer = user.timer;

      console.log(this.users);
    }
  }

  createQuizSession(user: User, quiz: Quiz): void {
    const quizSession: QuizSession = {
      date: new Date().getTime(),
      answers: [],
      quizId: quiz.id,
      timePerQuestion: [],
      userId: user.id
    }

    this.http.put<User>("http://localhost:9428/api/users/" + user.id + '/quizSession', quizSession)
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      )
  }

  updateQuizSession(user: User, isCorrect: boolean, elapsedTime: number, quizSessionId: number): void {
    const req = {answer: isCorrect, time: Math.round(elapsedTime/1000)};
    console.log("---------------");
    console.log(quizSessionId);
    console.log("---------------");
    console.log(req);
    this.http.put<User>("http://localhost:9428/api/users/" + user.id + '/quizSession/' + String(quizSessionId), req)
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      )
  }

}
