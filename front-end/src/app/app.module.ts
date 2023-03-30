import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { QuizComponent } from './quizzes/quiz/quiz.component';
import { HeaderComponent } from './header/header.component';
import { QuizFormComponent } from './quizzes/quiz-form/quiz-form.component';
import { EditQuizComponent } from './quizzes/edit-quiz/edit-quiz.component';
import { AppRoutingModule } from './app.routing.module';
import { QuestionListComponent } from './questions/question-list/question-list.component';
import { QuestionFormComponent } from './questions/question-form/question-form.component';
import { QuestionComponent } from './questions/question/question.component';
import { UserComponent } from './users/user/user.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { StartQuizComponent } from './quizzes/start-quiz/start-quiz.component';
import { QuizService } from 'src/services/quiz.service';
import { FinalScreenComponent } from './quizzes/final-screen/final-screen.component';
import { PlayQuizComponent } from './quizzes/play-quiz/play-quiz.component';
import { PlayQuizComponent2 } from './quizzes/play-quiz-2/play-quiz-2.component';
import { AssociationListComponent } from './associations/association-list/association-list.component';
import { AssociationComponent } from './associations/association/association.component';
import { AssociationFormComponent } from './associations/association-form/association-form.component';
import { QuestionChoice } from './questions/question-choice/question-choice.component';
@NgModule({
  declarations: [
    AppComponent,
    QuizListComponent,
    QuizComponent,
    HeaderComponent,
    QuizFormComponent,
    EditQuizComponent,
    QuestionListComponent,
    QuestionFormComponent,
    QuestionComponent,
    UserComponent,
    UserFormComponent,
    UserListComponent,
    StartQuizComponent,
    PlayQuizComponent,
    FinalScreenComponent,
    PlayQuizComponent2,
    AssociationListComponent,
    AssociationComponent,
    AssociationFormComponent,
    QuestionChoice
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [QuizService],
  bootstrap: [AppComponent]
})
export class AppModule { }
