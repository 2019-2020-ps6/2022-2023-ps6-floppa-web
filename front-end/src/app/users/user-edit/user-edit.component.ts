import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { USER_LIST } from 'src/mocks/user-list.mock';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  public userEdit: FormGroup;
  public user: User;

  constructor(public formBuilder: FormBuilder, public userService: UserService, private route: ActivatedRoute, private location: Location) {
    this.userEdit = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      alzheimerStade: [''],
      photo: ['']
    });
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.user = USER_LIST[Number(id) - 1];

    this.userEdit = this.formBuilder.group({
      firstName: [this.user.firstName],
      lastName: this.user.lastName,
      alzheimerStade: '',
      photo: ''
    });
    /*this.userService.userSelected$.subscribe((userSelected: User) => {
      
      this.user = userSelected;

      console.log(this.user);
      console.log(this.user.firstName);

      this.userEdit = this.formBuilder.group({
        firstName: [this.user.firstName],
        lastName: this.user.lastName,
        alzheimerStade: this.user.alzheimerStade,
        photo: this.user.photo
      });

      this.userEdit.controls.firstName.setValue(this.user.firstName);

    });*/

  }

  edit(formValue: any): void {
    const userToEdit: User = formValue as User;
    console.log(userToEdit);
    this.userService.edit(userToEdit);
  }

  goBack(): void {
    this.location.back();
  }

}