import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from 'src/models/question.model';
import { Observable } from 'rxjs';
import { Association, Connection } from 'src/models/association.model';

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

  addAssociation(association: Association, quizId: number): Observable<Association> {
    const url = `http://localhost:9428/api/quizzes/${quizId}/associations`;
    return this.http.post<Association>(url, association);
  }

  getAssociations(quizId: number): Observable<Association[]> {
    const url = `http://localhost:9428/api/quizzes/${quizId}/associations`;
    return this.http.get<Association[]>(url);
  }

  getConnections(quizId: number, associationId: number): Observable<Connection[]> {
    const url = `http://localhost:9428/api/quizzes/${quizId}/associations/${associationId}/connections`;
    return this.http.get<Connection[]>(url);
  }

  addConnection(quizId: number, associationId: number, connection: Connection): void {
    const url = `http://localhost:9428/api/quizzes/${quizId}/associations/${associationId}/connections`;
    this.http.post<Connection>(url,connection).subscribe();
  }

  updateAssociation(quizId: number, associationId: number, updatedAssociation): void {
    this.http.put<Association>(`http://localhost:9428/api/quizzes/${quizId}/associations/${associationId}`, updatedAssociation);
  }
}
