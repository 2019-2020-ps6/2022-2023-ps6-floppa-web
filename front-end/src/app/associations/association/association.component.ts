import { Component, OnInit, Input } from '@angular/core';
import { Association } from 'src/models/association.model';
import { QuizService } from 'src/services/quiz.service';
import { Quiz } from 'src/models/quiz.model';

@Component({
    selector: 'app-association',
    templateUrl: './association.component.html',
    styleUrls: ['./association.component.scss']
  })
export class AssociationComponent implements OnInit {

    @Input()
    association: Association;

    @Input()
    quiz: Quiz;

    constructor(private quizService: QuizService) { }
    ngOnInit(): void { }

    delete(): void {
        this.quizService.deleteAssociationFromQuiz(this.quiz, this.association);
    }
    
}