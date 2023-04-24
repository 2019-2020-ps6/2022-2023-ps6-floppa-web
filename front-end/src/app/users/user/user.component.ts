import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../services/user.service'; // Importez le service UserService
import { Router } from '@angular/router'; // Importez le module Router
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input()
  user: User;

  @Output()
  deleteUser: EventEmitter<User> = new EventEmitter<User>();
  editUser: EventEmitter<User> = new EventEmitter<User>();

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  delete() {
    this.deleteUser.emit(this.user);
  }

  edit(user: User): void {
    console.log("user.component",user);
    this.router.navigate(['/user-edit']);

    this.userService.setSelectedUser(user.id);
  }

}
