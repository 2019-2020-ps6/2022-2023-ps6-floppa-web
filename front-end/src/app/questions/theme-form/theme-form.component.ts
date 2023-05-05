import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { QuizService } from '../../../services/quiz.service';
import { ActivatedRoute } from '@angular/router';
import { THEME_QUIZ_LIST } from 'src/mocks/quiz-list.mock';
import { Theme } from 'src/models/theme.model';

@Component({
  selector: 'app-theme-form',
  templateUrl: './theme-form.component.html',
  styleUrls: ['./theme-form.component.scss']
})
export class ThemeFormComponent implements OnInit {

  theme!: Theme;

  public themeForm: FormGroup;
  public static counter: number = 2;

  constructor(public formBuilder: FormBuilder, private quizService: QuizService, private route: ActivatedRoute, private ngZone: NgZone) {
  }

  private initializeThemeForm(): void {
    this.themeForm = this.formBuilder.group({
      title: ['', Validators.required],
      description:  [''],
      coverImage: [''],
    });
  }

  ngOnInit(): void {
    this.initializeThemeForm();
  }

  public isThemeFormValid(): boolean {
    return this.themeForm.valid && 
    this.themeForm.get('title').value.length > 0 && 
    THEME_QUIZ_LIST.map(theme => theme.title).find(title => title === this.themeForm.get('title').value) == null;
  }

  addTheme(): void {
    if (!this.isThemeFormValid) return;
    const theme = this.themeForm.getRawValue() as Theme;
    theme.id = ThemeFormComponent.counter;
    ThemeFormComponent.counter++;
    console.log(theme);
    //Change for the Back End since the http push doesn't work.
    THEME_QUIZ_LIST.push(theme as Theme);
  }
}
