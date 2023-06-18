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
      photo: [''],
      timerMinute: [1],
      timerSeconds: [0],
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
    const timers: {timerMinute:number, timerSeconds: number} = this.userForm.getRawValue();
    if (timers.timerMinute === null) {
      timers.timerMinute = 0;
    }
    if (timers.timerSeconds === null) {
      timers.timerSeconds = 0;
    }

    this.userForm = this.formBuilder.group({
      firstName: [newUser.firstName],
      lastName: [newUser.lastName],
      alzheimerStade: [alzheimerStadeValue],
      indice: [this.indice],
      vocale: [this.vocale],
      visual: [this.visual],
      photo: [newUser.photo],
      timerMinute: [timers.timerMinute],
      timerSeconds: [timers.timerSeconds],
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

  getVisual(): Boolean {

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
    else {
      return "1000";
    }
  }

  isFormValid(): boolean {
    const newUser: User = this.userForm.getRawValue() as User;
    const timers: {timerMinute:number, timerSeconds: number} = this.userForm.getRawValue();
    if (timers.timerMinute === null) {
      timers.timerMinute = 0;
    }
    if (timers.timerSeconds === null) {
      timers.timerSeconds = 0;
    }

    if (newUser.firstName == "" || newUser.lastName == "" || newUser.alzheimerStade == "") {
      return false;
    }
    return true;
  }

  addUser(): void {
    const userInfo: User = this.userForm.getRawValue() as User;
    const timers: {timerMinute:number, timerSeconds: number} = this.userForm.getRawValue();
    if (timers.timerMinute === null) {
      timers.timerMinute = 0;
    }
    if (timers.timerSeconds === null) {
      timers.timerSeconds = 0;
    }

    let userToCreate: User = {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      alzheimerStade: userInfo.alzheimerStade,
      photo: userInfo.photo.replace(/\s+/g, ''),
      timer: Number(timers.timerMinute) + Number(timers.timerSeconds)/60,
      assistance: this.getAssistance(userInfo),
      quizSessions: [],
      id:""
    };

    if(userToCreate.photo == "") {
      userToCreate.photo = "assets/users/user.png"
    }
    console.log(userToCreate);
    this.userService.addUser(userToCreate);
  }

  goBack():void {
    this.location.back();
  }
}
