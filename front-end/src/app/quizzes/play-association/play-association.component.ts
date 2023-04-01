import { Component, OnInit,Input } from '@angular/core';
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

    constructor(private route: ActivatedRoute) {

    }

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        this.associationToPlay = QUIZ_LIST[Number(id) - 1].associations[0];
        
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
    }

    selectRight(value: string): void {
        this.selectedRight = value;
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