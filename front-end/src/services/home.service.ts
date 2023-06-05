import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { serverUrl, httpOptionsBase} from '../configs/server.config';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
    private password: string = "0000";

    private httpOptions = httpOptionsBase;
    private passwordUrl = serverUrl + '/password';

  constructor(private http: HttpClient) {
  }

  edit(newPassword: string): void{
    this.password = newPassword;
  }

  getUser(userId: string): Observable<User> {
    const urlWithId = this.passwordUrl + '/' + this.password;
    return this.http.get<string>(urlWithId, this.httpOptions);
  }

  

}