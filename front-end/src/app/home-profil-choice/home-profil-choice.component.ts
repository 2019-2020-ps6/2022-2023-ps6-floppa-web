import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { USER_LIST } from 'src/mocks/user-list.mock';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-home-profil-choice',
  templateUrl: './home-profil-choice.component.html',
  styleUrls: ['./home-profil-choice.component.scss']
})
export class HomeProfilChoiceComponent implements OnInit {

  public userList: User[] = USER_LIST;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }
}

