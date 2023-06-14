import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Answer } from 'src/models/question.model';
import { Observable } from 'rxjs';
import { Theme } from 'src/models/theme.model';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  constructor(private http: HttpClient) { }

  getThemes(): Observable<Theme[]> {
    const url = `http://localhost:9428/api/themes`;
    return this.http.get<Theme[]>(url);
  }

  addTheme(theme: Theme): void {
    const url = `http://localhost:9428/api/themes`;
    this.http.post<Theme>(url, theme)
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
    const url = `http://localhost:9428/api/themes/`+theme.id;
    this.http.delete<Theme>(url)
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