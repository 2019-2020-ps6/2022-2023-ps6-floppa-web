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
import { QuestionChoice } from './questions/question-choice/question-choice.component';
import { AnswerComponent } from './answer/answer.component';

const routes: Routes = [
    {path: 'user-list', component: UserListComponent},
    {path: 'quiz-list', component: QuizListComponent},
    {path: 'edit-quiz/:id', component: EditQuizComponent},
    {path: 'start-quiz/:id', component: StartQuizComponent},
    {path: 'play-quiz/:id/:score/:numQuestion/:stage', component: PlayQuizComponent},
    {path: 'final-screen/:id/:score/:stage', component: FinalScreenComponent},
    {path: 'question-form/:id', component: QuestionFormComponent },
    {path: 'association-form/:id', component: AssociationFormComponent },
    {path: 'answer/:id/:score/:isCorrect/:numQuestion/:stage', component: AnswerComponent},
    { path: '', redirectTo: '/quiz-list', pathMatch: 'full' },
    { path: 'user-form', component: UserFormComponent},
    { path: 'user-edit', component: UserEditComponent},

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
