import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { QUIZ_LIST } from 'src/mocks/quiz-list.mock';
import { Location } from '@angular/common';
import { PlayQuestionComponent } from 'src/app/questions/play-question/play-question.component';
import { User } from 'src/models/user.model';
import { USER_LIST } from 'src/mocks/user-list.mock';
import { QuestionService } from 'src/services/question.service';
import { Answer, Question } from 'src/models/question.model';
import { AnswerService } from 'src/services/answer.service';
import { UserService } from 'src/services/user.service';

const performance = window.performance;
declare const SpeechSynthesisUtterance: any;
declare const speechSynthesis: any;

@Component({
  selector: 'app-start-quiz',
  templateUrl: './play-quiz.component.html',
  styleUrls: ['./play-quiz.component.scss']
})
export class PlayQuizComponent implements OnInit, OnDestroy {

  @ViewChild(PlayQuestionComponent) questionChoice: PlayQuestionComponent;

  public score: number;

  public assistance: number;

  public quiz: Quiz;
  public quizQuestions: Question[];
  public answers: Answer[];
  public numQuestion: number;
  public answered = false;
  public isHintUsed = false;
  public user: User;
  public startTime: number;
  public currentSessionId: number = 0;
  timerHint: any;
  timerSound: any;

  constructor(private route: ActivatedRoute, private quizService: QuizService, private location: Location, private router: Router, private questionService: QuestionService, private answerService: AnswerService, public userService: UserService) {
    
  }

  ngOnInit(): void {
    this.startTime = performance.now();
    let id = this.route.snapshot.paramMap.get('id');
    this.quizService.getQuizData().subscribe((quizData) => {
      for (let quiz of quizData) {
        if (Number(quiz.id) === Number(id)) {
          this.quiz = quiz;
        }
      }
    })
    this.questionService.getQuestions(Number(id)).subscribe((questions) => {
      this.quizQuestions = questions;
      this.answerService.getAnswers(Number(id), Number(this.quizQuestions[this.numQuestion-1].id)).subscribe((answers) => {
        this.answers = answers;
      })
    })
    this.numQuestion = Number(this.route.snapshot.paramMap.get('numQuestion'));
    this.score = Number(this.route.snapshot.paramMap.get('score'));
    let userid = this.route.snapshot.paramMap.get('userid');
    this.userService.getUsers().subscribe((users) => {
      for (let userInList of users) {
        if (Number(userInList.id) === Number(userid)) this.setUser(userInList);
      }
    })
    this.assistance = Number(this.user.assistance);
    if (this.assistance % 10 >= 1) {
      this.timerHint = setTimeout(() => {
        this.useHint();
      }, 2 * 60 * 1000 * this.user.timer)
    }
    if (this.assistance % 100 >= 10) {
      this.timerSound = setTimeout(() => {
        this.useSound();
      }, 60 * 1000 * this.user.timer)
    }
    for (let id in this.user.quizSessions) {
      if (Number(id) > this.currentSessionId) this.currentSessionId = Number(id);
    }
  }

  ngOnDestroy(): void {
      clearInterval(this.timerHint);
      clearInterval(this.timerSound);
  }

  setUser(userToSet: User) {
    this.user = userToSet;
    this.assistance = Number(this.user.assistance);
  }
  
  check(indexAnswer: number): void {
    let isCorrect = this.quiz.questions[this.numQuestion-1].answers[indexAnswer-1].isCorrect;
    this.user.quizSessions[this.currentSessionId].answers.push(isCorrect);
    const endTime = performance.now();
    const elpasedTime = endTime - this.startTime;
    this.user.quizSessions[this.currentSessionId].timePerQuestion.push(Math.round(elpasedTime/1000));
    this.router.navigate(["/answer/" + this.quiz.id + "/" + this.score + "/" + isCorrect + "/" + this.numQuestion + "/" + this.user.id]);
  }

  goToNextQuestion(): void {
    if (this.numQuestion >= this.quiz.questions.length + this.quiz.associations.length) {
      this.router.navigate(["/final-screen/"+this.quiz.id+"/"+this.score+"/"+this.user.id]);
    }
    else {
      document.location.href = "/play-quiz/" + this.quiz.id + "/" + this.score + "/" + (this.numQuestion + 1) + "/" + this.user.id;
    }
  }

  checkAssociation(): void {
    let isCorrect = this.quiz.associations[this.numQuestion-1 - this.quiz.questions.length].isCorrect;
    this.user.quizSessions[this.currentSessionId].answers.push(isCorrect);
    const endTime = performance.now();
    const elpasedTime = endTime - this.startTime;
    this.user.quizSessions[this.currentSessionId].timePerQuestion.push(Math.round(elpasedTime/1000));
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