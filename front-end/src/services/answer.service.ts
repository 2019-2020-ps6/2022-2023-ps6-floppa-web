import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Answer } from 'src/models/question.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  private quizUrl = environment.apiUrl+"/quizzes/";

  constructor(private http: HttpClient) { }

  addAnswer(answer: Answer, quizId: number, questionId: number): Observable<Answer> {
    const url = this.quizUrl+`${quizId}/questions/${questionId}/answers`;
    return this.http.post<Answer>(url, answer);
  }

  getAnswers(quizId: number, questionId: number): Observable<Answer[]> {
    const url = this.quizUrl+`${quizId}/questions/${questionId}/answers`;
    return this.http.get<Answer[]>(url);
  }
}