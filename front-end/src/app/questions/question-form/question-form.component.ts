import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from 'src/models/quiz.model';
import { Question } from 'src/models/question.model';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/services/question.service';
import { AnswerService } from 'src/services/answer.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {

  quiz!: Quiz;

  public questionForm: FormGroup;
  public quizId: string;
  public themeId: number;
  constructor(public formBuilder: FormBuilder, private quizService: QuizService, private route: ActivatedRoute, private ngZone: NgZone, public questionService: QuestionService, public answerService: AnswerService) {
    this.initializeQuestionForm();
  }

  private initializeQuestionForm(): void {
    this.questionForm = this.formBuilder.group({
      label: ['', Validators.required],
      answers: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
    this.quizId = this.route.snapshot.paramMap.get('id');
    this.themeId = Number(this.route.snapshot.paramMap.get('theme'));
  }

  get answers(): FormArray {
    return this.questionForm.get('answers') as FormArray;
  }

  private createAnswer(): FormGroup {
    return this.formBuilder.group({
      value:['', Validators.required],
      img:['', Validators.required],
      isCorrect: false,
    });
  }

  addAnswer(): void {
    this.answers.push(this.createAnswer());
  }

  public isQuestionFormValid(): boolean {
    return this.questionForm.valid && 
    this.questionForm.get('answers').value.length > 0 &&
    this.questionForm.get('answers').value.some((answer: any) => answer.isCorrect);
  }

  public answerDuplicated(): boolean {
    console.log(this.questionForm.get('answers').value);
    let answers = this.questionForm.get('answers').value;
    for(let i = 0; i < answers.length; i++) {
      for(let j = 0; j < answers.length; j++) {
        if(i !== j && answers[i].value === answers[j].value) {
          return true;
        }
      }
    }

    return false;
  }

  addQuestion(): void {
    if (!this.isQuestionFormValid) return;
    const question = this.questionForm.getRawValue() as Question;
    this.questionService.addQuestion({label: question.label, quizId: Number(this.quizId)}, Number(this.quizId)).subscribe((newQuestion) => {
      for (let answer of question.answers) {
        this.answerService.addAnswer({...answer, questionId: Number(newQuestion.id)}, Number(this.quizId), Number(newQuestion.id)).subscribe();
      }
    });
    //this.initializeQuestionForm();
  }
}
