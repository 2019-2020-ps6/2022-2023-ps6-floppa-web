import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from 'src/models/question.model';
import { Observable } from 'rxjs';
import { Association, Connection } from 'src/models/association.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  
  private quizUrl = environment.apiUrl+"/quizzes/";

  constructor(private http: HttpClient) { }

  addQuestion(question: Question, quizId: number): Observable<Question> {
    const url = this.quizUrl+`${quizId}/questions`;
    return this.http.post<Question>(url, question);
  }

  getQuestions(quizId: number): Observable<Question[]> {
    const url = this.quizUrl+`${quizId}/questions`;
    return this.http.get<Question[]>(url);
  }

  addAssociation(association: Association, quizId: number): Observable<Association> {
    const url = this.quizUrl+`${quizId}/associations`;
    return this.http.post<Association>(url, association);
  }

  getAssociations(quizId: number): Observable<Association[]> {
    const url = this.quizUrl+`${quizId}/associations`;
    return this.http.get<Association[]>(url);
  }

  getConnections(quizId: number, associationId: number): Observable<Connection[]> {
    const url = this.quizUrl+`${quizId}/associations/${associationId}/connections`;
    return this.http.get<Connection[]>(url);
  }

  addConnection(quizId: number, associationId: number, connection: Connection): void {
    const url = this.quizUrl+`${quizId}/associations/${associationId}/connections`;
    console.log(connection);
    this.http.post<Connection>(url,connection).subscribe();
  }

  updateAssociation(quizId: number, associationId: number, updatedAssociation): void {
    const url = this.quizUrl+`${quizId}/associations/${associationId}`;
    console.log(updatedAssociation.isCorrect);
    this.http.put<Association>(url, updatedAssociation);
  }
}
