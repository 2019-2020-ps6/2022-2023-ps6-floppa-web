import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { ReactiveFormsModule } from '@angular/forms';
import {Location} from '@angular/common';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  public userForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public userService: UserService, private location: Location) {
    this.userForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      alzheimerStade: [''],
      photo: ['']
    });
  }

  ngOnInit(): void {
  }

  addUser(): void {
    // We retrieve here the user object from the userForm and we cast the type "as User".
    const userToCreate: User = this.userForm.getRawValue() as User;
    console.log(userToCreate);
    this.userService.addUser(userToCreate);
  }

  goBack():void {
    this.location.back();
  }
}
