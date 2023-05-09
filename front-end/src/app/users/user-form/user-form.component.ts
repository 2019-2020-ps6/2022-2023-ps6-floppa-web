import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { ReactiveFormsModule } from '@angular/forms';
import {Location} from '@angular/common';
import { USER_LIST } from 'src/mocks/user-list.mock';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  public userForm: FormGroup;
  public isSmallText = false;
  public isBigText = false;

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

  makeTextSmall(): void {
    this.isSmallText = true;
    this.isBigText = false;
  }

  makeTextBig(): void {
    this.isSmallText = false;
    this.isBigText = true;
  }

  getIndice(): Boolean {

    const radioButtons = document.getElementsByName("indice") as NodeListOf<HTMLInputElement>;

    let indiceValue = "";
    for (let i = 0; i < radioButtons.length; i++) {
      if (radioButtons[i].checked) {
        indiceValue = radioButtons[i].value;
        break;
      }
    }

    if (indiceValue == "oui"){
      return true;
    }
    else {
      return false;
    }
  }

  getVocale(): Boolean {

    const radioButtons = document.getElementsByName("vocale") as NodeListOf<HTMLInputElement>;

    let vocaleValue = "";
    for (let i = 0; i < radioButtons.length; i++) {
      if (radioButtons[i].checked) {
        vocaleValue = radioButtons[i].value;
        break;
      }
    }

    if (vocaleValue == "oui"){
      return true;
    }
    else {
      return false;
    }
  }

  getAssistance(user: User): string {
    if (this.isBigText && this.getIndice() && this.getVocale()){
      return "1111";
    }

    if (this.isBigText && this.getVocale()){
      return "1110";
    }
    if (this.isBigText && this.getIndice()){
      return "1101";
    }
    if (this.getVocale() && this.getIndice()){
      return "1011";
    }

    if (this.isBigText) {
      return "1100";
    }
    if (this.getVocale()){
      return "1010";
    }
    if (this.getIndice()){
      return "1001";
    }

  }

  addUser(): void {
    const userToCreate: User = this.userForm.getRawValue() as User;
    userToCreate.assistance = this.getAssistance(userToCreate);
    console.log(userToCreate);
    this.userService.addUser(userToCreate);
  }

  goBack():void {
    this.location.back();
  }
}
