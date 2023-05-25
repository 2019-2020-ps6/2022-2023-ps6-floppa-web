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
  public indice:string;
  public vocale:string;
  public visual:string;

  constructor(public formBuilder: FormBuilder, public userService: UserService, private location: Location) {
    this.userForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      alzheimerStade: [''],
      indice: [''],
      vocale: [''],
      visual: [''],
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

  setAssistanceValue(): void {
    const radioButtons = document.getElementsByName("alzheimerStade") as NodeListOf<HTMLInputElement>;
    
    let alzheimerStadeValue = ""; 
    for (let i = 0; i < radioButtons.length; i++) {
      if (radioButtons[i].checked) {
        alzheimerStadeValue = radioButtons[i].value;
        break;
      }
    }

    if (alzheimerStadeValue == "stade léger") {
      console.log("oui");
      this.indice = "non";
      this.vocale = "non";
      this.visual = "non";
    }

    if (alzheimerStadeValue == "stade intermédiaire") {
      this.indice = "oui";
      this.vocale = "non";
      this.visual = "non";
    }

    if (alzheimerStadeValue == "stade avancé") {
      this.indice = "oui";
      this.vocale = "oui";
      this.visual = "oui";
    }

    this.updateAssistanceChecked(alzheimerStadeValue);
  }


  updateAssistanceChecked(alzheimerStadeValue:string): void {
    const newUser: User = this.userForm.getRawValue() as User;

    this.userForm = this.formBuilder.group({
      firstName: [newUser.firstName],
      lastName: [newUser.lastName],
      alzheimerStade: [alzheimerStadeValue],
      indice: [this.indice],
      vocale: [this.vocale],
      visual: [this.visual],
      photo: [newUser.photo]
    })

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

    return (indiceValue == "oui");
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

    return (vocaleValue == "oui");
  }

  getVisual(): Boolean {

    const radioButtons = document.getElementsByName("visual") as NodeListOf<HTMLInputElement>;

    let visualValue = "";
    for (let i = 0; i < radioButtons.length; i++) {
      if (radioButtons[i].checked) {
        visualValue = radioButtons[i].value;
        break;
      }
    }

    return (visualValue == "oui");
  }

  getAssistance(user: User): string {
    if (this.getVisual() && this.getIndice() && this.getVocale()){
      return "1111";
    }

    if (this.getVisual() && this.getVocale()){
      return "1110";
    }
    if (this.getVisual() && this.getIndice()){
      return "1101";
    }
    if (this.getVocale() && this.getIndice()){
      return "1011";
    }

    if (this.getVisual()) {
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
    userToCreate.id = String(USER_LIST.length + 1);
    userToCreate.quizSessions = {};
    console.log(userToCreate);
    this.userService.addUser(userToCreate);
    console.log(USER_LIST);
  }

  goBack():void {
    this.location.back();
  }
}
