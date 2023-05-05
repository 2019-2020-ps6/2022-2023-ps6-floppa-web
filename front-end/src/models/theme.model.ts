import {Quiz} from './quiz.model';

export interface Theme {
    id: number;
    title: string;
    description: string;
    quizList: Quiz[];
    coverImage: string;
}