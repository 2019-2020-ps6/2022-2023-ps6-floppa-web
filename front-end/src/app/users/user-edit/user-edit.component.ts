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
  public users: User[];
  public isSmallText = false;
  public isBigText = false;

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
    this.user = this.userService.users$.getValue()[parseInt(id)-1];

    this.userEdit = this.formBuilder.group({
      firstName: [this.user.firstName],
      lastName: [this.user.lastName],
      indice: [this.getIndice()],
      vocale: [this.getVocale()],
      visual: [this.getVisual()],
      alzheimerStade: [this.user.alzheimerStade],
      photo: [this.user.photo]
    });
    console.log(this.getVisual());
    console.log(this.user.assistance);
  }

  getIndice(): string {
    if (this.user.assistance == "1111" || this.user.assistance == "1101" || this.user.assistance == "1011" || this.user.assistance == "1001"){
      return "oui";
    }
    else {
      return "non";
    }
  }
  // indiceOuiChecked(): Boolean {
  //   if (this.getIndice()){
  //     return true;
  //   }
  //   else {
  //     return false;
  //   }
  // }

  // indiceNonChecked(): Boolean {
  //   if (this.getIndice()){
  //     return false;
  //   }
  //   else {
  //     return true;
  //   }
  // }

  // vocaleOuiChecked(): Boolean {
  //   if (this.getVocale()){
  //     return true;
  //   }
  //   else {
  //     return false;
  //   }
  // }

  // vocaleNonChecked(): Boolean {
  //   if (this.getVocale()){
  //     return false;
  //   }
  //   else {
  //     return true;
  //   }
  // }

  getVocale(): string {
    if (this.user.assistance == "1111" || this.user.assistance == "1110" || this.user.assistance == "1011" || this.user.assistance == "1010"){
      return "oui";
    }
    else {
      return "non";
    }
  }

  getVisual(): string {
    if (this.user.assistance == "1111" || this.user.assistance == "1110" || this.user.assistance == "1101" || this.user.assistance == "1100"){
      return "oui";
    }
    else {
      return "non";
    }
  }

  makeTextSmall(): void {
    this.isSmallText = true;
    this.isBigText = false;
  }

  makeTextBig(): void {
    this.isSmallText = false;
    this.isBigText = true;
  }

  getNewIndice(): Boolean {

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

  getNewVocale(): Boolean {

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

  getNewVisual(): boolean {
    const radioButtons = document.getElementsByName("visual") as NodeListOf<HTMLInputElement>;

    let visualValue = "";
    for (let i = 0; i < radioButtons.length; i++) {
      if (radioButtons[i].checked) {
        visualValue = radioButtons[i].value;
        break;
      }
    }

    if (visualValue == "oui"){
      return true;
    }
    else {
      return false;
    }
  }

  getNewAssistance(user : User) : string {
    if (this.getNewVisual() && this.getNewIndice() && this.getNewVocale()){
      return "1111";
    }

    if (this.getNewVisual() && this.getNewVocale()){
      return "1110";
    }
    if (this.getNewVisual() && this.getNewIndice()){
      return "1101";
    }
    if (this.getNewVocale() && this.getNewIndice()){
      return "1011";
    }

    if (this.getNewVisual()) {
      return "1100";
    }
    if (this.getNewVocale()){
      return "1010";
    }
    if (this.getNewIndice()){
      return "1001";
    }
    else return this.user.assistance;
  }


  edit(): void {
    const userToEdit: User = this.userEdit.getRawValue() as User;
    userToEdit.id = this.user.id;
    userToEdit.assistance = this.getNewAssistance(userToEdit);
    console.log(userToEdit);
    this.userService.edit(userToEdit);
  }

  goBack(): void {
    this.location.back();
  }

}