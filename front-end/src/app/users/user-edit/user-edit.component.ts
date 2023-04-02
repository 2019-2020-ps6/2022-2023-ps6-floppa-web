import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';import {Location} from '@angular/common';


@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.scss']
})

export class UserEditComponent implements OnInit {

  public userEdit: FormGroup;
  public user: User;
  private userId: string;
  
  constructor(public formBuilder: FormBuilder, public userService: UserService, private route: ActivatedRoute, private location: Location) {
    this.userEdit = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      alzheimerStade: [''],
      photo: ['']
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
      this.userService.getUser(this.userId).subscribe(user => {
        this.userEdit.patchValue(user);
        this.userEdit = this.formBuilder.group({
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          alzheimerStade: this.user.alzheimerStade,
          photo: this.user.photo
        });
      });
    });
  }
  
  edit(formValue: any): void {
    const userToEdit: User = formValue as User;
    console.log(userToEdit);
    this.userService.edit(userToEdit);
  }

  goBack():void {
    this.location.back();
  }

}