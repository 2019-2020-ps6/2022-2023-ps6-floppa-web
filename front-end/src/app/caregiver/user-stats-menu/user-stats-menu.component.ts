import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { USER_LIST } from 'src/mocks/user-list.mock';
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
    let userid = this.route.snapshot.paramMap.get("userid");
    this.userService.getUser(userid).subscribe((user) => {
      this.user = user;
    })
  }

  ngOnInit(): void {
  }
}