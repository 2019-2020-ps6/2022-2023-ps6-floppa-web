import { Component, OnInit, Input } from '@angular/core';
import { Association } from 'src/models/association.model';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';


@Component({
    selector: 'app-association-list',
    templateUrl: './association-list.component.html',
    styleUrls: ['./association-list.component.scss']
  })
export class AssociationListComponent implements OnInit {

    @Input()
    quiz: Quiz;

    constructor(private quizService: QuizService) { }
    ngOnInit(): void { }

    deleteAssociation(association: Association): void {
    }
  
    editAssociation(association: Association): void {
    }
    
}