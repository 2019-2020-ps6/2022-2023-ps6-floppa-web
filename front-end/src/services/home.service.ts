import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import { Observable } from 'rxjs';
import { password } from 'src/mocks/quiz-list.mock';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  //private password: string;
  private httpOptions = httpOptionsBase;
  private passwordUrl = serverUrl + '/password';

  constructor(private http: HttpClient) {
  }

  addPassword(password: string): Observable<string> {
    return this.http.post<string>(this.passwordUrl, password, this.httpOptions);
  }

  edit(newPassword: string): Observable<any> {
    password.password = newPassword;
    return this.http.put<any>(this.passwordUrl, newPassword, this.httpOptions);
  }

  getPassword(): string {
    const headers = new HttpHeaders().set('Authorization', 'Bearer your_token_here');
    const urlWithId = this.passwordUrl + '/' + encodeURIComponent(password.password);
    return password.password;
    //return this.http.get<string>(urlWithId, { ...this.httpOptions, headers });
  }
}
