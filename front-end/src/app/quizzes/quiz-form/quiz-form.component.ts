import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import { ReactiveFormsModule } from '@angular/forms';
import { QUIZ_LIST } from 'src/mocks/quiz-list.mock';
import { ActivatedRoute } from '@angular/router';
import { THEME_QUIZ_LIST } from 'src/mocks/quiz-list.mock';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.scss']
})
export class QuizFormComponent implements OnInit {

  // Note: We are using here ReactiveForms to create our form. Be careful when you look for some documentation to
  // avoid TemplateDrivenForm (another type of form)

  /**
   * QuizForm: Object which manages the form in our component.
   * More information about Reactive Forms: https://angular.io/guide/reactive-forms#step-1-creating-a-formgroup-instance
   */
  public quizForm: FormGroup;
  public themeIndex: number;
  
  // public THEME_LIST: string[] = ["Les animaux", "Géographie", "Le sport", "Cuisine", "Musique"];

  constructor(private route: ActivatedRoute, public formBuilder: FormBuilder, public quizService: QuizService) {
    // Form creation
    this.themeIndex = Number(this.route.snapshot.paramMap.get("themeIndex"));
    this.quizForm = this.formBuilder.group({
      name: [''],
    });
    // You can also add validators to your inputs such as required, maxlength or even create your own validator!
    // More information: https://angular.io/guide/reactive-forms#simple-form-validation
    // Advanced validation: https://angular.io/guide/form-validation#reactive-form-validation
  }

  ngOnInit() {
  }

  addQuiz() {
    const quizToCreate: Quiz = this.quizForm.getRawValue() as Quiz;

    quizToCreate.questions = [];
    quizToCreate.associations = [];
    quizToCreate.id = (QUIZ_LIST.length+1).toString();
    //this.quizService.addQuiz(quizToCreate);
    THEME_QUIZ_LIST.find(theme => theme.id === this.themeIndex)?.quizList.push(quizToCreate);
    console.log(THEME_QUIZ_LIST);
    //THEME_QUIZ_LIST[this.themeIndex].quizList.push(quizToCreate);
  }
}