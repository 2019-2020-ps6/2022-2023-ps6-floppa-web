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

  public userList: User[] = [];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    for (let user of USER_LIST) {
      this.userList.push(user);
    }
    this.userList.sort((a,b) => a.lastName.localeCompare(b.lastName));
  }
}

