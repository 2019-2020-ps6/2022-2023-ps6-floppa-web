import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from 'src/models/question.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(private http: HttpClient) { }

  addQuestion(question: Question, quizId: number): Observable<Question> {
    const url = `http://localhost:9428/api/quizzes/${quizId}/questions`;
    return this.http.post<Question>(url, question);
  }

  getQuestions(quizId: number): Observable<Question[]> {
    const url = `http://localhost:9428/api/quizzes/${quizId}/questions`;
    return this.http.get<Question[]>(url);
  }
}

