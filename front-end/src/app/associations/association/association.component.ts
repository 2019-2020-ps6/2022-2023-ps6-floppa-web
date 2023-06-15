import { Component, OnInit, Input } from '@angular/core';
import { Association, Connection } from 'src/models/association.model';
import { QuizService } from 'src/services/quiz.service';
import { Quiz } from 'src/models/quiz.model';
import { QuestionService } from 'src/services/question.service';

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

    public connections: Connection[];

    constructor(private quizService: QuizService, public questionService: QuestionService) { }
    ngOnInit(): void { 
        this.questionService.getConnections(Number(this.quiz.id),Number(this.association.id)).subscribe((connections) => {
            this.connections = connections;
        })
    }

    delete(): void {
        this.quizService.deleteAssociationFromQuiz(this.quiz, this.association);
    }
    
}