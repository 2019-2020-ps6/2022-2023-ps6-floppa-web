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

    @Input('id')
    id: number;

    constructor() {
    }

    ngOnInit(): void {
        this.changeLinePosition();
    }

    changeLinePosition(): void {
        let y2 = 100 * this.id;
        let line = document.getElementById("line" + this.id);
        document.getElementById("line").setAttribute("y2", String(y2));
        document.getElementById("line").setAttribute("x2", "300");
        console.log(line);
    }
}