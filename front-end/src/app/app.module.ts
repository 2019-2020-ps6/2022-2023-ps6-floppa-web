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
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { AssociationListComponent } from './associations/association-list/association-list.component';
import { AssociationComponent } from './associations/association/association.component';
import { AssociationFormComponent } from './associations/association-form/association-form.component';
import { PlayAssociationComponent } from './quizzes/play-association/play-association.component';
import { ConnectionComponent } from './quizzes/connection/connection.component';
import { PlayQuestionComponent } from './questions/play-question/play-question.component';
import { AnswerComponent } from './answer/answer.component';
import { HomeProfilChoiceComponent } from './home-profil-choice/home-profil-choice.component';
import { CommonModule } from '@angular/common';
import { ThemeListComponent } from './quizzes/theme-list/theme-list.component';
import { UserManagementComponent } from './caregiver/user-management/user-management.component';
import { UserStatsComponent } from './caregiver/user-stats/user-stats.component';
import { UserQuizStatsComponent } from './caregiver/user-quiz-stats/user-quiz-stats.component';
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
    PlayAssociationComponent,
    AssociationListComponent,
    AssociationComponent,
    AssociationFormComponent,
    ConnectionComponent,
    UserEditComponent,
    AssociationListComponent,
    AssociationComponent,
    AssociationFormComponent,
    PlayQuestionComponent,
    AnswerComponent,
    HomeProfilChoiceComponent,
    ThemeListComponent,
    UserManagementComponent,
    UserStatsComponent,
    UserQuizStatsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [QuizService],
  bootstrap: [AppComponent]
})
export class AppModule { }
