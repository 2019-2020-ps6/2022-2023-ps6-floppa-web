import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { USER_LIST } from 'src/mocks/user-list.mock';
import { stringify } from 'querystring';


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
  public indice:string;
  public vocale:string;
  public visual:string;

  constructor(public formBuilder: FormBuilder, public userService: UserService, private route: ActivatedRoute, private location: Location) {

    this.userEdit = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      alzheimerStade: [''],
      photo: [''],
      timerMinute: [],
      timerSeconds: [],
    });
  }

  ngOnInit(): void {
    let id = (this.route.snapshot.paramMap.get('id')).toString();
    console.log(id);
    this.userService.getUser(id).subscribe((user) => {
      this.user = user;
      console.log(this.user)
      console.log(this.user.timer)
      let tm: number = Math.trunc(this.user.timer);
      let ts: number = Math.round((this.user.timer - tm) * 60);

      this.userEdit = this.formBuilder.group({
        firstName: [this.user.firstName],
        lastName: [this.user.lastName],
        indice: [this.getIndice(user)],
        vocale: [this.getVocale(user)],
        visual: [this.getVisual(user)],
        alzheimerStade: [this.user.alzheimerStade],
        photo: [this.user.photo],
        timerMinute: [tm],
        timerSeconds: [ts]
      });
      console.log(this.userEdit.value.indice);
    });
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
    const newUser: User = this.userEdit.getRawValue() as User;
    
    const timers: {timerMinute:number, timerSeconds: number} = this.userEdit.getRawValue();
    if (timers.timerMinute === null) {
      timers.timerMinute = 0;
    }
    if (timers.timerSeconds === null) {
      timers.timerSeconds = 0;
    }

    this.userEdit = this.formBuilder.group({
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

  getIndice(user: User): string {
    if (user.assistance == "1111" || user.assistance == "1101" || user.assistance == "1011" || user.assistance == "1001"){
      return "oui";
    }
    else {
      return "non";
    }
  }

  getVocale(user: User): string {
    if (user.assistance == "1111" || user.assistance == "1110" || user.assistance == "1011" || user.assistance == "1010"){
      return "oui";
    }
    else {
      return "non";
    }
  }

  getVisual(user: User): string {
    if (user.assistance == "1111" || user.assistance == "1110" || user.assistance == "1101" || user.assistance == "1100"){
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

    if (!this.getNewIndice() && !this.getNewVisual() && !this.getNewVocale()){
      return "1000";
    }
    else return this.user.assistance;
  }


  edit(): void {
    const userInfo: User = this.userEdit.getRawValue() as User;
    const timers: {timerMinute:number, timerSeconds: number} = this.userEdit.getRawValue();
    if (timers.timerMinute === null) {
      timers.timerMinute = 0;
    }
    if (timers.timerSeconds === null) {
      timers.timerSeconds = 0;
    }

    let userToEdit: User = {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      alzheimerStade: userInfo.alzheimerStade,
      photo: userInfo.photo,
      timer: Number(timers.timerMinute) + Number(timers.timerSeconds)/60,
      assistance: this.getNewAssistance(userInfo),
      quizSessions: [],
      id: this.user.id
    };
    console.log(userToEdit);
    this.userService.edit(userToEdit);
  }

  goBack(): void {
    this.location.back();
  }

}