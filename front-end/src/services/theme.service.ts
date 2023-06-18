import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Answer } from 'src/models/question.model';
import { Observable } from 'rxjs';
import { Theme } from 'src/models/theme.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private themeUrl = environment.apiUrl+"/themes";

  constructor(private http: HttpClient) { }

  getThemes(): Observable<Theme[]> {
    return this.http.get<Theme[]>(this.themeUrl);
  }

  addTheme(theme: Theme): void {
    this.http.post<Theme>(this.themeUrl, theme)
    .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  deleteTheme(theme: Theme): void {
    this.http.delete<Theme>(this.themeUrl+"/"+theme.id)
    .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}