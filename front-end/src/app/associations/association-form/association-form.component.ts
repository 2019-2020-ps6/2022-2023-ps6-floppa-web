import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from 'src/models/quiz.model';
import { ActivatedRoute } from '@angular/router';
import { QUIZ_LIST } from 'src/mocks/quiz-list.mock';
import { Association } from 'src/models/association.model';

@Component({
  selector: 'app-association-form',
  templateUrl: './association-form.component.html',
  styleUrls: ['./association-form.component.scss']
})
export class AssociationFormComponent implements OnInit {

  quiz!: Quiz;
  public quizId: string;

  public associationForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private quizService: QuizService, private route: ActivatedRoute, private ngZone: NgZone) {
    this.initializeAssociationForm();
  }

  private initializeAssociationForm(): void {
    this.associationForm = this.formBuilder.group({
      label: ['', Validators.required],
      connections: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
    this.quizId = this.route.snapshot.paramMap.get('id');
  }

  get connections(): FormArray {
    return this.associationForm.get('connections') as FormArray;
  }

  private createConnection(): FormGroup {
    return this.formBuilder.group({
      valueToConnect: '',
      valueToBeConnected: '',
    });
  }

  addConnection(): void {
    this.connections.push(this.createConnection());
  }

  public isAssociationFormValid(): boolean {
    let connections = this.associationForm.get('connections').value;

    return this.associationForm.valid &&
    connections.length > 0 && 
    connections.some((connection: any) => connection.valueToBeConnected && connection.valueToConnect) &&
    connections.every((connection: any) => !(connection.valueToBeConnected == "" && connection.valueToConnect == ""));
  }

  addAssociation(): void {
    if (!this.isAssociationFormValid) return;
    const association = this.associationForm.getRawValue() as Association;
    this.quizService.addAssociation(this.quizId, association);
    //Change for the Back End since the http push doesn't work.
    QUIZ_LIST[Number(this.quizId) - 1].associations.push(association);
    this.initializeAssociationForm();
  }
}
