import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { EditQuizComponent } from './quizzes/edit-quiz/edit-quiz.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { StartQuizComponent } from './quizzes/start-quiz/start-quiz.component';
import { PlayQuizComponent } from './quizzes/play-quiz/play-quiz.component';
import { FinalScreenComponent } from './quizzes/final-screen/final-screen.component';
import { QuestionFormComponent } from './questions/question-form/question-form.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { AssociationFormComponent } from './associations/association-form/association-form.component';
import { PlayAssociationComponent } from './quizzes/play-association/play-association.component';
import { ConnectionComponent } from './quizzes/connection/connection.component';
import { HomeProfilChoiceComponent } from './home-profil-choice/home-profil-choice.component';
import { AnswerComponent } from './answer/answer.component';

const routes: Routes = [
    {path: 'user-list', component: UserListComponent},
    {path: 'quiz-list/:user', component: QuizListComponent},
    {path: 'edit-quiz/:id', component: EditQuizComponent},
    {path: 'play-association/:id', component: PlayAssociationComponent},
    {path: 'question-form/:id', component: QuestionFormComponent },
    {path: 'connection/:id', component: ConnectionComponent},
    {path: 'start-quiz/:id/:assistance', component: StartQuizComponent},
    {path: 'play-quiz/:id/:score/:numQuestion/:assistance', component: PlayQuizComponent},
    {path: 'final-screen/:id/:score/:assistance', component: FinalScreenComponent},
    {path: 'question-form/:id', component: QuestionFormComponent },
    {path: 'association-form/:id', component: AssociationFormComponent },
    {path: 'answer/:id/:score/:isCorrect/:numQuestion/:assistance', component: AnswerComponent},
    {path: 'home-profil-choice', component: HomeProfilChoiceComponent},
    { path: 'user-form', component: UserFormComponent},
    { path: 'user-edit', component: UserEditComponent},
    { path: '', redirectTo: '/home-profil-choice', pathMatch: 'full' },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
