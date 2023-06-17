import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef,AfterViewInit } from '@angular/core';
import { Association, Connection } from 'src/models/association.model';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.model';
import { QuizService } from 'src/services/quiz.service';
import { QuestionService } from 'src/services/question.service';
@Component({
  selector: 'app-play-association',
  templateUrl: './play-association.component.html',
  styleUrls: ['./play-association.component.scss']
})

export class PlayAssociationComponent implements AfterViewInit, OnInit {

    @Input('association')
    public associationToPlay!: Association;
    public connections: Connection[];
    public shuffledValuesToConnect: string[][] = [];
    public shuffledValuesToBeConnected: string[][] = [];
    public selectedLeft: string = "";
    public selectedRight: string = "";
    public currentLeftButton: number;
    public currentRightButton: number;
    public currentConnections?: string[][] = [];
    public currentLines?: SVGLineElement[][];

    @ViewChild('linescontainer', { static: false}) linesContainer!: ElementRef;

    private line: SVGLineElement | null = null;

    @Input()
    public numAssociation: number;

    @Input()
    public user: User;

    @Output()
    answer = new EventEmitter<boolean>();

    @Output()
    nextQuestion = new EventEmitter<void>();

    constructor(private route: ActivatedRoute, public quizService: QuizService, public questionService: QuestionService) {
        
    }

    ngAfterViewInit() {
        // Access the SVG element here
        console.log(this.linesContainer.nativeElement);
      }

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        this.questionService.getAssociations(Number(id)).subscribe((associations) => {
            this.associationToPlay = associations[this.numAssociation];
            this.associationToPlay.isCorrect = false;
            this.questionService.getConnections(Number(id),Number(this.associationToPlay.id)).subscribe((connections) => {
                this.connections = connections;
                console.log(connections);
                for(const element of connections){
                    this.shuffledValuesToConnect.push([element.valueToConnect, element.coverImageToConnect]);
                    this.shuffledValuesToBeConnected.push([element.valueToBeConnected, element.coverImageToBeConnected]);
                }
                
                this.shuffledValuesToConnect = this.shuffle(this.shuffledValuesToConnect);
                this.shuffledValuesToBeConnected = this.shuffle(this.shuffledValuesToBeConnected);
                
                this.currentLines = [...Array(this.shuffledValuesToConnect.length)].map(e => Array(this.shuffledValuesToBeConnected.length));
                console.log(this.shuffledValuesToConnect);
                console.log(this.shuffledValuesToBeConnected);
            })
        })
    }

    goToNextQuestion(): void {
        this.nextQuestion.emit();
    }

    shuffle: any = (array: any[]) => {
        let currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    selectLeft(value: string, buttonId: number): void {
        this.selectedLeft = value;
        this.currentLeftButton = buttonId;
        console.log(this.shuffledValuesToConnect);
        if(this.currentConnections.find((connection) => connection[0] === value))
        {
            this.deleteConnection(value, this.currentConnections.find((connection) => connection[0] === value)![1]);
            for(let element of this.currentLines)
                element[this.currentLeftButton]?.remove();
        }

        if(this.selectedRight != "")
            this.createConnection(this.selectedLeft, this.selectedRight);
    }

    selectRight(value: string, buttonId: number): void {
        this.selectedRight = value;
        this.currentRightButton = buttonId;

        if(this.currentConnections.find((connection) => connection[1] === value))
        {

            this.deleteConnection(this.currentConnections.find((connection) => connection[1] === value)![0], value);
            for(let element of this.currentLines)
                for(let index of element)
                {
                    if(index) index[this.currentRightButton]?.remove();
                }
        }
        
        if(this.selectedLeft != "")
            this.createConnection(this.selectedLeft, this.selectedRight);
    }

    createConnection(val1: string, val2: string): void {
        this.currentConnections.push([val1, val2]);
        this.createLineBetweenButtons();
        this.selectedLeft = "";
        this.selectedRight = "";
        this.currentLeftButton = -1;
        this.currentRightButton = -1;
        console.log(this.currentConnections);
    }


    createLineBetweenButtons(): void {
        const leftButton = document.getElementById(`left-button${this.currentLeftButton}`)!;
        const rightButton = document.getElementById(`right-button${this.currentRightButton}`)!;

        const rectLeft = leftButton.getBoundingClientRect();
        const rectRight = rightButton.getBoundingClientRect();

        const leftX = rectLeft.x + rectLeft.width
        const leftY = rectLeft.y + rectLeft.height / 2;

        const rightX = rectRight.x;
        const rightY = rectRight.y + rectRight.height / 2;

        this.drawLine(leftX, leftY, rightX, rightY);
    }


    deleteConnection(val1: string, val2: string): void {
        this.currentConnections = this.currentConnections.filter((connection) => connection[0] !== val1 && connection[1] !== val2);
    
    }

    deleteAllConnections(): void {
        this.resetAssociation();
        this.currentLines?.forEach((line) => line.forEach((element) => element?.remove()));
    }

    check(): void {
        this.associationToPlay.isCorrect = false;
        let id = this.route.snapshot.paramMap.get('id');
        this.questionService.updateAssociation(Number(id),Number(this.associationToPlay.id),this.associationToPlay);
        if(this.currentConnections.length == 0)
        {
            console.log("Select at least one connection");
            return;
        }

        if(this.currentConnections.length != this.connections.filter((connection) => connection.valueToConnect && connection.valueToBeConnected).length){
            console.log("Incorrect");
            this.answer.emit();
            this.resetAssociation();
            return;
        }

        for(const connection of this.currentConnections){
            let connectionToCheck = this.connections.find((connectionToCheck) => connectionToCheck.valueToConnect === connection[0] && connectionToCheck.valueToBeConnected === connection[1]);

            if(!connectionToCheck){
                console.log(false);
                this.answer.emit();
                this.resetAssociation();
                return;
            }
        }
        
        console.log("Correct");
        this.associationToPlay.isCorrect = true;
        this.questionService.updateAssociation(Number(id),Number(this.associationToPlay.id),this.associationToPlay);
        this.answer.emit(true);
        this.resetAssociation();
    }

    resetAssociation(): void {
        this.associationToPlay.isCorrect = false;
        let id = this.route.snapshot.paramMap.get('id');
        this.questionService.updateAssociation(Number(id),Number(this.associationToPlay.id),this.associationToPlay);
        this.selectedLeft = "";
        this.selectedRight = "";
        this.currentLeftButton = -1;
        this.currentRightButton = -1;
        this.currentConnections = [];
    }

    drawLine(startX, startY, endX, endY) {

        let id = this.currentLeftButton + "-" + this.currentRightButton;

        if(document.getElementById(id)) return;

        const svg = this.linesContainer.nativeElement as SVGElement;
        this.line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        svg.appendChild(this.line);

        this.line.setAttribute('stroke', 'blue');
        this.line.setAttribute('stroke-width', '10');
        this.line.setAttribute('x1', startX.toString());
        this.line.setAttribute('y1', startY.toString());
        this.line.setAttribute('x2', endX.toString());
        this.line.setAttribute('y2', endY.toString());
        this.line.setAttribute('id', id);

        this.currentLines[this.currentLeftButton][this.currentRightButton] = this.line;
      }
}