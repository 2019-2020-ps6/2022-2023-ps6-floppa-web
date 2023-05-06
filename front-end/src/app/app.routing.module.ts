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
import { HomeProfilChoiceComponent } from './home-profil-choice/home-profil-choice.component';
import { AnswerComponent } from './answer/answer.component';
import { ThemeListComponent } from './quizzes/theme-list/theme-list.component';
import { UserManagementComponent } from './caregiver/user-management/user-management.component';
import { UserStatsComponent } from './caregiver/user-stats/user-stats.component';
import { UserQuizStatsComponent } from './caregiver/user-quiz-stats/user-quiz-stats.component';
import { UserStatsMenuComponent } from './caregiver/user-stats-menu/user-stats-menu.component';
import { ThemeEditorComponent } from './quizzes/theme-editor/theme-editor.component';
import { ThemeFormComponent } from './questions/theme-form/theme-form.component';
import { QuizEditorComponent } from './quizzes/quiz-editor/quiz-editor.component';

const routes: Routes = [
    {path: 'user-list', component: UserListComponent},
    {path: 'quiz-list/:user/:themeIndex/:type', component: QuizListComponent},
    {path: 'edit-quiz/:themeIndex/:id', component: EditQuizComponent},
    {path: 'play-association/:id', component: PlayAssociationComponent},
    {path: 'start-quiz/:id/:userid', component: StartQuizComponent},
    {path: 'play-quiz/:id/:score/:numQuestion/:userid', component: PlayQuizComponent},
    {path: 'final-screen/:id/:score/:userid', component: FinalScreenComponent},
    {path: 'question-form/:theme/:id', component: QuestionFormComponent },
    {path: 'association-form/:theme/:id', component: AssociationFormComponent },
    {path: 'answer/:id/:score/:isCorrect/:numQuestion/:userid', component: AnswerComponent},
    {path: 'home-profil-choice', component: HomeProfilChoiceComponent},
    {path: 'theme-list/:user/:type', component: ThemeListComponent},
    {path: '', redirectTo: '/home-profil-choice', pathMatch: 'full' },
    {path: 'uer-form', component: UserFormComponent},
    {path: 'user-edit', component: UserEditComponent},
    {path: '', redirectTo: '/home-profil-choice', pathMatch: 'full' },
    {path:'user-management', component: UserManagementComponent},
    {path:'user-stats/:user', component: UserStatsComponent},
    {path:'user-quiz-stats/:user/:id', component: UserQuizStatsComponent},
    {path:'user-stats-menu/:userid', component: UserStatsMenuComponent},
    {path: 'theme-editor', component: ThemeEditorComponent},
    {path: 'theme-form', component: ThemeFormComponent },
    {path: 'quiz-editor/:themeIndex', component: QuizEditorComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
