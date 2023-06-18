import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-user-stats-menu',
  templateUrl: './user-stats-menu.component.html',
  styleUrls: ['./user-stats-menu.component.scss']
})
export class UserStatsMenuComponent implements OnInit {

  public user: User;

  constructor(private router: Router, private route: ActivatedRoute, public userService: UserService) {
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('userid');
    let userid = this.route.snapshot.paramMap.get('userid');
    this.userService.getUsers().subscribe((users) => {
      for (let userInList of users) {
        if (Number(userInList.id) === Number(userid)) this.user = userInList;
      }
    })
  }
}