import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { QUIZ_LIST } from 'src/mocks/quiz-list.mock';
import { Location } from '@angular/common';
import { PlayQuestionComponent } from 'src/app/questions/play-question/play-question.component';
import { User } from 'src/models/user.model';
import { USER_LIST } from 'src/mocks/user-list.mock';

const performance = window.performance;
declare const SpeechSynthesisUtterance: any;
declare const speechSynthesis: any;

@Component({
  selector: 'app-start-quiz',
  templateUrl: './play-quiz.component.html',
  styleUrls: ['./play-quiz.component.scss']
})
export class PlayQuizComponent implements OnInit {

  @ViewChild(PlayQuestionComponent) questionChoice: PlayQuestionComponent;

  public score: number;

  public assistance: number;

  public quiz: Quiz;
  public numQuestion: number;
  public answered = false;
  public isHintUsed = false;
  public user: User;
  public startTime: number;
  public currentSessionId: number = 0;

  constructor(private route: ActivatedRoute, private quizService: QuizService, private location: Location, private router: Router) {
    
  }

  ngOnInit(): void {
    this.startTime = performance.now();
    let id = this.route.snapshot.paramMap.get('id');
    this.quiz = QUIZ_LIST[Number(id)-1];
    this.numQuestion = Number(this.route.snapshot.paramMap.get('numQuestion'));
    this.score = Number(this.route.snapshot.paramMap.get('score'));
    this.user = USER_LIST[Number(this.route.snapshot.paramMap.get('userid'))-1]
    this.assistance = Number(this.user.assistance);
    if (this.assistance % 10 >= 1) {
      setTimeout(() => {
        this.useHint();
      }, 2 * 60 * 1000)
    }
    if (this.assistance % 100 >= 10) {
      setTimeout(() => {
        this.useSound();
      }, 60 * 1000)
    }
    for (let id in this.user.quizSessions) {
      if (Number(id) > this.currentSessionId) this.currentSessionId = Number(id);
    }
  }

  check(indexAnswer: number): void {
    let isCorrect = this.quiz.questions[this.numQuestion-1].answers[indexAnswer-1].isCorrect;
    this.user.quizSessions[this.currentSessionId-1].answers.push(isCorrect);
    const endTime = performance.now();
    const elpasedTime = endTime - this.startTime;
    this.user.quizSessions[this.currentSessionId-1].timePerQuestion.push(Math.round(elpasedTime/1000));
    this.router.navigate(["/answer/" + this.quiz.id + "/" + this.score + "/" + isCorrect + "/" + this.numQuestion + "/" + this.user.id]);
  }

  checkAssociation(): void {
    let isCorrect = this.quiz.associations[this.numQuestion-1 - this.quiz.questions.length].isCorrect;
    this.user.quizSessions[this.currentSessionId-1].answers.push(isCorrect);
    const endTime = performance.now();
    const elpasedTime = endTime - this.startTime;
    this.user.quizSessions[this.currentSessionId-1].timePerQuestion.push(Math.round(elpasedTime/1000));
    this.router.navigate(["/answer/" + this.quiz.id + "/" + this.score + "/" + isCorrect + "/" + this.numQuestion + "/" + this.user.id]);
  }

  useHint(): void {
    if (!this.isHintUsed && !this.answered) {
      let hintImg = document.getElementById('hint') as HTMLImageElement;
      hintImg.src = "/assets/used-hint.png";
      document.getElementById('hint-text').style.color = "green"
      this.isHintUsed = true;
      this.questionChoice.remove2Images();
    }
  }

  useSound(): void {
    if (!this.answered) {
      let soundImg = document.getElementById('sound-img') as HTMLImageElement;
      soundImg.src = "/assets/used-sound.png";
      document.getElementById("sound-text").style.color = "green";
      this.readSentence();
    }
  }

  readSentence(): void {
    let utterance = null;
    if(this.quiz.questions.length > this.numQuestion-1) {
      utterance = new SpeechSynthesisUtterance(this.quiz.questions[this.numQuestion-1].label);
    }
    else
    {
      utterance = new SpeechSynthesisUtterance(this.quiz.associations[this.numQuestion-1 - this.quiz.questions.length].label);
    }
    speechSynthesis.speak(utterance);
  }
}