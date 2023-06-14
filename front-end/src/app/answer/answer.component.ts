import { Component, OnInit, Input, Output, EventEmitter, ViewChild, NgModule, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { Location, CommonModule } from '@angular/common';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';
import { QuestionService } from 'src/services/question.service';
import { Answer, Question } from 'src/models/question.model';
import { AnswerService } from 'src/services/answer.service';
import { Association, Connection } from 'src/models/association.model';
@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit, OnDestroy {
  public quiz: Quiz;
  public isCorrect: boolean;
  public score: number;
  public numQuestion: number;
  public correctAnswer: number;
  public assistance: number;
  public user: User;
  public quizQuestions: Question[];
  public quizAssociations: Association[];
  public answers: Answer[];
  public connections: Connection[];
  timer: any;

  constructor(private route: ActivatedRoute, private quizService: QuizService, private location: Location, private router: Router, public userService: UserService, public questionService: QuestionService, public answerService: AnswerService) {
    
  }

  ngOnInit(): void {
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
      this.numQuestion = Number(this.route.snapshot.paramMap.get('numQuestion'));
      if (this.numQuestion <= this.quizQuestions.length) {
        this.answerService.getAnswers(Number(id), Number(this.quizQuestions[this.numQuestion-1].id)).subscribe((answers) => {
          this.answers = answers;
          this.correctAnswer = this.getCorrectAnswer(answers);
        })
      }
      this.questionService.getAssociations(Number(id)).subscribe((associations) => {
        this.quizAssociations = associations;
        if (this.numQuestion > this.quizQuestions.length) {
          let association = this.quizAssociations[this.numQuestion - this.quizQuestions.length - 1]
          this.questionService.getConnections(Number(id),Number(association.id)).subscribe((connections) => {
            this.connections = connections;
          })
        }
      })
    })
    
    this.numQuestion = Number(this.route.snapshot.paramMap.get('numQuestion'));
    this.score = Number(this.route.snapshot.paramMap.get('score'));
    if (this.route.snapshot.paramMap.get('isCorrect') === 'true') {
        this.isCorrect = true;
        this.score++;
    }
    else {
        this.isCorrect = false;
    }
    let userid = this.route.snapshot.paramMap.get('userid');
    this.userService.getUsers().subscribe((users) => {
      for (let userInList of users) {
        if (Number(userInList.id) === Number(userid)) {
          this.user = userInList;
          this.assistance = Number(this.user.assistance);
        }
      }
    })
    if(this.numQuestion <= this.quizQuestions.length + this.quizAssociations.length)
    this.timer = setTimeout(() => {
      if (this.numQuestion+1 > this.quiz.questions.length) {
        this.router.navigate(['/final-screen/' + this.quiz.id + '/' + this.score + "/" + this.user.id]);
      }
      else {
        this.router.navigate(["/play-quiz/" + this.quiz.id + "/" + this.score + "/" + (this.numQuestion+1) + "/" + this.user.id]);
      }
    }, 2 * 60 * 1000 * this.user.timer);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  getCorrectAnswer(answers: Answer[]): number {
    for (let i = 0; i < answers.length; i++) {
      if (answers[i].isCorrect) {
        return i;
      }
    }
    return 0;
  }

  nextQuestion(): void {
    if (this.numQuestion+1 > this.quizQuestions.length + this.quizAssociations.length) {
      this.router.navigate(['/final-screen/' + this.quiz.id + '/' + this.score + "/" + this.user.id]);
    }
    else {
      this.router.navigate(["/play-quiz/" + this.quiz.id + "/" + this.score + "/" + (this.numQuestion+1) + "/" + this.user.id]);
    }
  }
}