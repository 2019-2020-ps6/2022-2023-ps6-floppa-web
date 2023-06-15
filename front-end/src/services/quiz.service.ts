import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { QUIZ_LIST } from '../mocks/quiz-list.mock';
import { Question } from '../models/question.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import { Association } from '../models/association.model';
import { THEME_QUIZ_LIST } from '../mocks/quiz-list.mock';
import { Theme } from '../models/theme.model';
import { User } from 'src/models/user.model';
import { QuestionService } from './question.service';
@Injectable({
  providedIn: 'root'
})
export class QuizService {
  /*
   Services Documentation:
   https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  /*
   The list of quiz.
   The list is retrieved from the mock.
   */
  private quizzes: Quiz[] = QUIZ_LIST;

  private score: number = 0;
  /*
   Observable which contains the list of the quiz.
   Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public quizzes$: BehaviorSubject<Quiz[]>
    = new BehaviorSubject(this.quizzes);

  public quizSelected$: Subject<Quiz> = new Subject();

  private quizUrl = serverUrl + '/quizzes';
  private questionsPath = 'questions';
  private associationsPath = 'associations';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.retrieveQuizzes();
  }

  retrieveQuizzes(): void {
    this.http.get<Quiz[]>(this.quizUrl).subscribe((quizList) => {
      this.quizzes = quizList;
      this.quizzes$.next(this.quizzes);
    });
  }

  getQuizData(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>('http://localhost:9428/api/quizzes');
  }

  addQuiz(quiz: Quiz): void {
    this.http.post<Quiz>(this.quizUrl, quiz, this.httpOptions)
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  setSelectedQuiz(quizId: string): void {
    const urlWithId = this.quizUrl + '/' + quizId;
    this.http.get<Quiz>(urlWithId).subscribe((quiz) => {
      this.quizSelected$.next(quiz);
    });
  }

  deleteQuiz(quiz: Quiz): void {
    const urlWithId = this.quizUrl + '/' + quiz.id;
    this.http.delete<Quiz>(urlWithId, this.httpOptions)
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  addQuestion(quizId: string, question: any): void {
    const questionUrl = this.quizUrl + '/' + quizId + '/' + this.questionsPath;
    this.http.post<Question>(questionUrl, question, this.httpOptions).subscribe(() => this.setSelectedQuiz(quizId));
  }

  deleteQuestion(quiz: Quiz, question: Question): void {
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id;
    this.http.delete<Question>(questionUrl, this.httpOptions).subscribe();
  }

  addAssociation(quizId: string, association: Association): Observable<Association> {
    const associationUrl = this.quizUrl + '/' + quizId + '/' + this.associationsPath;
    return this.http.post<Association>(associationUrl, association, this.httpOptions);
  }
  //temporaire, à changer pour le back end
  deleteQuestionFromQuiz(quiz: Quiz, question: Question): void {
    this.http.delete<Question>("http://localhost:9428/api/quizzes/"+quiz.id+"/questions/"+question.id)
    .subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteAssociationFromQuiz(quiz: Quiz, association: Association): void {
    this.http.delete<Association>("http://localhost:9428/api/quizzes/"+quiz.id+"/associations/"+association.id)
    .subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getScore(): number {
    return this.score;
  }

  addScore(): void {
    this.score++;
    console.log(this.score);
  }

  resetScore(): void {
    this.score = 0;
  }

  addUserToQuiz(quiz: Quiz, user: User): void {
    quiz.users.push(user.id);
    console.log('http://localhost:9428/api/quizzes/'+quiz.id);
    this.http.put<Quiz>('http://localhost:9428/api/quizzes/'+quiz.id,quiz).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  removeUserToQuiz(quiz: Quiz): void {
    this.http.put<Quiz>('http://localhost:9428/api/quizzes/'+quiz.id,quiz).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  /*
  Note: The functions below don't interact with the server. It's an example of implementation for the exercice 10.
  addQuestion(quiz: Quiz, question: Question) {
    quiz.questions.push(question);
    const index = this.quizzes.findIndex((q: Quiz) => q.id === quiz.id);
    if (index) {
      this.updateQuizzes(quiz, index);
    }
  }

  deleteQuestion(quiz: Quiz, question: Question) {
    const index = quiz.questions.findIndex((q) => q.label === question.label);
    if (index !== -1) {
      quiz.questions.splice(index, 1)
      this.updateQuizzes(quiz, index);
    }
  }

  private updateQuizzes(quiz: Quiz, index: number) {
    this.quizzes[index] = quiz;
    this.quizzes$.next(this.quizzes);
  }
  */
}
