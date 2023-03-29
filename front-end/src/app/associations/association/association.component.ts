import { Component, OnInit, Input } from '@angular/core';
import { Association } from 'src/models/association.model';


@Component({
    selector: 'app-association',
    templateUrl: './association.component.html',
    styleUrls: ['./association.component.scss']
  })
export class AssociationComponent implements OnInit {

    @Input()
    association: Association;

    constructor() { }
    ngOnInit(): void { }


    
}