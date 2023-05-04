import {Quiz} from './quiz.model';

export interface Theme {
    title: string;
    description: string;
    quizList: Quiz[];
    coverImage: string;
}