import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-home-profil-choice',
  templateUrl: './home-profil-choice.component.html',
  styleUrls: ['./home-profil-choice.component.scss']
})
export class HomeProfilChoiceComponent implements OnInit {

  public userList: User[] = [];

  constructor(private router: Router, public userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.userList = users;
    })
    this.userList.sort((a,b) => a.lastName.localeCompare(b.lastName));
  }
}

