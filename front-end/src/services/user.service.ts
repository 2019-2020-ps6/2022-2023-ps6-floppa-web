import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { QuizSession, User } from '../models/user.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import { ThisReceiver } from '@angular/compiler';
import { UserEditComponent } from 'src/app/users/user-edit/user-edit.component';
import { USER_LIST } from 'src/mocks/user-list.mock';
import { Quiz } from 'src/models/quiz.model';
import { environment } from 'src/environments/environment';

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

  private userUrl = environment.apiUrl+"/users";

  constructor(private http: HttpClient) {
    this.retrieveUsers();
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }

  retrieveUsers(): void {
    this.users$.next(this.users);
  }

  getUser(userId: string): Observable<User> {
    const urlWithId = this.userUrl + '/' + userId;
    return this.http.get<User>(this.userUrl+"/"+userId);
  }

  addUser(user: User): void {
    console.log(user);
    this.http.post<User>(this.userUrl, user).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log('Error occured:' , err);
      }
    );
    // this.users.push(user);
    // this.users$.next(this.users);
  }

  setSelectedUser(userId: string): void {
    this.users$.subscribe((users) => {
      const user = users.filter(user => user.id === userId)[0];
      this.userSelected$.next(user);
      console.log("user: ", user);
    });
  }

  deleteUser(user: User): void {
    const userId = user.id;
    this.http.delete<User>(this.userUrl+"/"+userId).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log('Error occured:' , err);
      }
    );
    // for (let i=0; i<this.users.length; i++){
    //   if (this.users[i] == user){
    //     this.users.splice(i, 1);
    //   }
    // }
  }

  edit(user: User): void{
    console.log(user);
    console.log(user.id);

    const userId = user.id;
    this.http.put<User>(this.userUrl+"/"+userId, user).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log('Error occured:' , err);
      }
    );
  }

  createQuizSession(user: User, quiz: Quiz): void {
    const quizSession: QuizSession = {
      date: new Date().getTime(),
      answers: [],
      quizId: quiz.id,
      timePerQuestion: [],
      userId: user.id
    }

    this.http.put<User>(this.userUrl+"/" + user.id + '/quizSession', quizSession)
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
    console.log(req);
    this.http.put<User>(this.userUrl+"/" + user.id + '/quizSession/' + String(quizSessionId), req)
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
