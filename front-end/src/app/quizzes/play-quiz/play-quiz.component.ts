import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { QUIZ_LIST } from 'src/mocks/quiz-list.mock';
import { Location } from '@angular/common';
import { QuestionChoice } from 'src/app/questions/question-choice/question-choice.component';

declare const SpeechSynthesisUtterance: any;
declare const speechSynthesis: any;

@Component({
  selector: 'app-start-quiz',
  templateUrl: './play-quiz.component.html',
  styleUrls: ['./play-quiz.component.scss']
})
export class PlayQuizComponent implements OnInit {

  @ViewChild(QuestionChoice) questionChoice: QuestionChoice;

  public score: number;

  public stage = 2;

  public quiz: Quiz;
  public numQuestion: number;
  public answered = false;
  public isHintUsed = false;

  constructor(private route: ActivatedRoute, private quizService: QuizService, private location: Location) {
    
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.quiz = QUIZ_LIST[Number(id)-1];
    this.numQuestion = Number(this.route.snapshot.paramMap.get('numQuestion'));
    this.score = Number(this.route.snapshot.paramMap.get('score'));
    console.log(this.numQuestion, id)
  }

  check(indexAnswer: number): void {
    let isCorrect = this.quiz.questions[this.numQuestion-1].answers[indexAnswer-1].isCorrect;
    console.log(isCorrect);
    document.location.href = "/answer/" + this.quiz.id + "/" + this.score + "/" + isCorrect + "/" + this.numQuestion;
  }

  nextQuestion(): void {
    document.getElementById('next-question-button').style.display="none"
    if (this.answered) {
      this.numQuestion++;
      if (this.numQuestion > this.quiz.questions.length) {
        document.location.href = '/final-screen/' + this.quiz.id;
      }
      this.update();
    }
  }

  update(): void {
    document.getElementById('answer-label').innerHTML = "";
    let answers = document.getElementsByClassName('answer');
    for (let i = 0; i < answers.length; i++) {
      let img = answers[i] as HTMLImageElement;
      img.src = "/assets/quiz-" + this.quiz.id + "/question-" + this.numQuestion + "/img-" + (i+1) + ".jpg";
    }
    this.answered = false;
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
    const utterance = new SpeechSynthesisUtterance(this.quiz.questions[this.numQuestion-1].label);
    speechSynthesis.speak(utterance);
  }
}
