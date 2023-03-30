import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { ReactiveFormsModule } from '@angular/forms';
import { UrlSegment } from '@angular/router';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.scss']
})

export class UserEditComponent implements OnInit {

  public userForm: FormGroup;
  public user: User;
  
  constructor(public formBuilder: FormBuilder, public userService: UserService) {
    this.userForm = this.formBuilder.group({
      firstName: ['user.firstName'],
      lastName: ['user.lastName'],
      alzheimerStade: ['user.alzheimerStade'],
      photo: ['user.photo']
    });
  }
  
  ngOnInit(): void {
  }
  
  edit(user: User): void {
    const userToEdit: User = this.userForm.getRawValue() as User;
    console.log(userToEdit);
    this.userService.edit(userToEdit);
  }
}