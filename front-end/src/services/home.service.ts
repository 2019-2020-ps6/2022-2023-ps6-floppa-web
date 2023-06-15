import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import { Observable } from 'rxjs';
import { Login } from 'src/models/login.model';
import { newArray } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private http: HttpClient) {
  }

  editLogin(newPassword: string): void {
    let psw: string;
    let pswId: string;
    this.getLogin().subscribe((login) => {
      psw = login.password;
      pswId = login.id;
      console.log(pswId);
      console.log(newPassword);
      let newLogin: Login = {
        id: pswId,
        password: newPassword
      };
      return this.http.put<Login>("http://localhost:9428/api/login/"+pswId, newLogin).subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log('Error occured:' , err);
        }
    )});
  }

  getLogin(): Observable<Login> {
    // const headers = new HttpHeaders().set('Authorization', 'Bearer your_token_here');
    // const urlWithId = this.passwordUrl + '/' + encodeURIComponent(password.password);
    return this.http.get<Login>("http://localhost:9428/api/login/1686835438071");
    //return this.http.get<string>(urlWithId, { ...this.httpOptions, headers });
  }
}
