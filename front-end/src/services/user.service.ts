import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import { ThisReceiver } from '@angular/compiler';
import { UserEditComponent } from 'src/app/users/user-edit/user-edit.component';
import { USER_LIST } from 'src/mocks/user-list.mock';

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

  getUsers(): User[] {
    console.log(this.users)
    return this.users;
  }

  retrieveUsers(): void {
    this.users$.next(this.users);
  }

  getUser(userId: string): Observable<User> {
    const urlWithId = this.userUrl + '/' + userId;
    return this.http.get<User>(urlWithId, this.httpOptions);
  }

  addUser(user: User): void {
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
    const index = this.users.findIndex(u => u.id === user.id);
    if (index >= 0) {
      this.users[index].firstName = user.firstName;
      this.users[index].lastName = user.lastName;
      this.users[index].alzheimerStade = user.alzheimerStade;
      this.users[index].assistance = user.assistance;
      this.users[index].photo = user.photo;

      const urlWithId = this.userUrl + '/' + user.id;
      this.http.put<User>(urlWithId, user, this.httpOptions).subscribe(() => this.retrieveUsers());
      this.users$.next(this.users);
  }

    console.log(USER_LIST);
  }

}
