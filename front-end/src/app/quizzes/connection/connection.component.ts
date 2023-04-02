import { Component, OnInit,Input } from '@angular/core';
import { Association } from 'src/models/association.model';
import { ActivatedRoute } from '@angular/router';
import { QUIZ_LIST } from 'src/mocks/quiz-list.mock';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent implements OnInit {

    @Input('connection')
    connection: string[][] = [];

    @Input('id')
    id: number = 0;

    @Input('shuffledValuesToConnect')
    shuffledValuesToConnect: string[] = [];

    @Input('shuffledValuesToBeConnected')
    shuffledValuesToBeConnected: string[] = [];

    constructor() {
    }

    ngOnInit(): void {
        this.shuffledValuesToConnect = this.shuffledValuesToConnect.filter((value) => value != null);
        this.shuffledValuesToBeConnected = this.shuffledValuesToBeConnected.filter((value) => value != null);
        
        let id1 = this.shuffledValuesToConnect.findIndex((value) => value == this.connection[0].toString());
        let id2 = this.shuffledValuesToBeConnected.findIndex((value) => value == this.connection[1].toString());

        this.createLine(id1,id2);
    }

    createLine(i1: number, i2: number): void {

        let y1 = 100 * i1;
        let y2 = 100 * i2;
        
        let line = document.getElementById("line" + this.id);
        
        if(!line)
        {
            const svg = document.getElementsByTagName('svg')[0];
            let g = document.createElement('line');
            svg.appendChild(g);
            g.setAttribute("x1","0"); 
            g.setAttribute("y1","0"); 
            g.setAttribute("x2","0"); 
            g.setAttribute("y2","0");
            g.setAttribute("stroke-width","10");
            g.setAttribute("stroke","black");
            g.setAttribute("id", "line" + this.id.toString());
            line = g;
        }

        line.setAttribute("y2", String(y2));
        line.setAttribute("y1", String(y1));

        line.setAttribute("x2", "300");

        console.log(document.getElementsByTagName('svg')[0]);
    }
}