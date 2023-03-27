import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { EditQuizComponent } from './quizzes/edit-quiz/edit-quiz.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { StartQuizComponent } from './quizzes/start-quiz/start-quiz.component';
import { PlayQuizComponent } from './quizzes/play-quiz/play-quiz.component';
import { FinalScreenComponent } from './quizzes/final-screen/final-screen.component';
import { PlayQuizComponent2 } from './quizzes/play-quiz-2/play-quiz-2.component';
import { PlayQuizComponent3 } from './quizzes/play-quiz-3/play-quiz-3.component';
import { QuestionFormComponent } from './questions/question-form/question-form.component';

const routes: Routes = [
    {path: 'user-list', component: UserListComponent},
    {path: 'quiz-list', component: QuizListComponent},
    {path: 'edit-quiz/:id', component: EditQuizComponent},
    {path: 'start-quiz/:id', component: StartQuizComponent},
    {path: 'play-quiz/:id', component: PlayQuizComponent},
    {path: 'play-quiz-2/:id', component: PlayQuizComponent2},
    {path: 'play-quiz-3/:id', component: PlayQuizComponent3},
    {path: 'final-screen/:id/:score', component: FinalScreenComponent},
    {path: 'question-form', component: QuestionFormComponent },
    { path: '', redirectTo: '/quiz-list', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
