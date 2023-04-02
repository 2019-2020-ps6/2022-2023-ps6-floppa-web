import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Association } from 'src/models/association.model';
import { ActivatedRoute } from '@angular/router';
import { QUIZ_LIST } from 'src/mocks/quiz-list.mock';
import { ConnectionComponent } from '../connection/connection.component';

@Component({
  selector: 'app-play-association',
  templateUrl: './play-association.component.html',
  styleUrls: ['./play-association.component.scss']
})
export class PlayAssociationComponent implements OnInit {

    @Input('association')
    public associationToPlay!: Association;
    public shuffledValuesToConnect: string[] = [];
    public shuffledValuesToBeConnected: string[] = [];
    public selectedLeft: string = "";
    public selectedRight: string = "";
    public currentConnections: string[][] = [];

    @Output()
    answer = new EventEmitter<number>();

    constructor(private route: ActivatedRoute) {

    }

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        this.associationToPlay = QUIZ_LIST[Number(id) - 1].associations[0];
        this.associationToPlay.isCorrect = false;
        for(const element of this.associationToPlay.connections){
            this.shuffledValuesToConnect.push(element.valueToConnect);
            this.shuffledValuesToBeConnected.push(element.valueToBeConnected);
        }

        this.shuffledValuesToConnect = this.shuffle(this.shuffledValuesToConnect);
        this.shuffledValuesToBeConnected = this.shuffle(this.shuffledValuesToBeConnected);
        
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

    selectLeft(value: string): void {
        this.selectedLeft = value;

        if(this.currentConnections.find((connection) => connection[0] === value))
            this.deleteConnection(value, this.currentConnections.find((connection) => connection[0] === value)![1]);

        if(this.selectedRight != "")
            this.createConnection(this.selectedLeft, this.selectedRight);
    }

    selectRight(value: string): void {
        this.selectedRight = value;
        
        if(this.selectedLeft != "")
            this.createConnection(this.selectedLeft, this.selectedRight);
    }

    createConnection(val1: string, val2: string): void {
        this.currentConnections.push([val1, val2]);
        this.selectedLeft = "";
        this.selectedRight = "";
    }

    deleteConnection(val1: string, val2: string): void {
        this.currentConnections = this.currentConnections.filter((connection) => connection[0] !== val1 && connection[1] !== val2);
    }

    check(): void {
        this.associationToPlay.isCorrect = false;
        if(this.currentConnections.length == 0)
        {
            console.log("Select at least one connection");
            return;
        }

        if(this.currentConnections.length != this.associationToPlay.connections.filter((connection) => connection.valueToConnect && connection.valueToBeConnected).length){
            console.log("Incorrect");
            this.answer.emit();
            this.resetAssociation();
            return;
        }

        for(const connection of this.currentConnections){
            let connectionToCheck = this.associationToPlay.connections.find((connectionToCheck) => connectionToCheck.valueToConnect === connection[0] && connectionToCheck.valueToBeConnected === connection[1]);

            if(!connectionToCheck){
                console.log("Incorrect");
                this.answer.emit();
                this.resetAssociation();
                return;
            }
        }
        
        console.log("Correct");
        this.associationToPlay.isCorrect = true;
        this.answer.emit();
        this.resetAssociation();
    }

    resetAssociation(): void {
        this.associationToPlay.isCorrect = false;
        this.selectedLeft = "";
        this.selectedRight = "";
        this.currentConnections = [];
    }

    changeLinePosition(id: number): void {
        // let line = document.getElementById("line");
        // document.getElementById("line").setAttribute("y2", "100");
        // document.getElementById("line").setAttribute("x2", "300");
        // console.log(line);

        // let y2 = 100 * id;
        // let line = document.getElementById("line" + id);
        // document.getElementById("line").setAttribute("y2", String(y2));
        // document.getElementById("line").setAttribute("x2", "300");
        // console.log(line);
    }
}