import { Component, OnInit, Input } from '@angular/core';
import { Association } from 'src/models/association.model';
import { Quiz } from 'src/models/quiz.model';
import { QuestionService } from 'src/services/question.service';
import { QuizService } from 'src/services/quiz.service';


@Component({
    selector: 'app-association-list',
    templateUrl: './association-list.component.html',
    styleUrls: ['./association-list.component.scss']
  })
export class AssociationListComponent implements OnInit {

    public associations: Association[];
    @Input()
    quiz: Quiz;

    constructor(public questionService: QuestionService) { }
    ngOnInit(): void { 
      this.questionService.getAssociations(Number(this.quiz.id)).subscribe((associations) => {
        this.associations = associations;
      })
    }

    deleteAssociation(association: Association): void {
    }
  
    editAssociation(association: Association): void {
    }
    
}