import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { USER_LIST } from 'src/mocks/user-list.mock';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-user-stats',
  templateUrl: './user-quiz-stats.component.html',
  styleUrls: ['./user-quiz-stats.component.scss']
})
export class UserQuizStatsComponent implements OnInit {

    public userList: User[];
    public username: string;
    public user: User;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.username = this.route.snapshot.paramMap.get("user");
    this.userList = USER_LIST;
    this.getUser(this.username);
  }

  ngOnInit(): void {
  }

  getUser(username: string): void {
    for (let user of this.userList) {
      if (user.firstName + "-" + user.lastName === username) {
        this.user = user;
      }
    }
  }
}