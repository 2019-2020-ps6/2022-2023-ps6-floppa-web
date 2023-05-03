import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { USER_LIST } from 'src/mocks/user-list.mock';
import { User } from 'src/models/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-stats-menu',
  templateUrl: './user-stats-menu.component.html',
  styleUrls: ['./user-stats-menu.component.scss']
})
export class UserStatsMenuComponent implements OnInit {

  public user: User;

  constructor(private router: Router, private route: ActivatedRoute) {
    let userid = this.route.snapshot.paramMap.get("userid");
    this.user = USER_LIST[Number(userid)-1];
  }

  ngOnInit(): void {
  }
}