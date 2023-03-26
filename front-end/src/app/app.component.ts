import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  score: number = 0;
  title = 'starter-quiz';

  onQuizFinished(score: number) {
    this.score = score;
  }
}
