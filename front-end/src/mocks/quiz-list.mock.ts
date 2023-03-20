import { Quiz } from '../models/quiz.model';
import { Question } from '../models/question.model';

export const QUESTION_FLOPPA: Question = {
    id: '1',
    label: 'Qui est le caracal ?',
    answers: [
        {
            value: 'Capy',
            isCorrect: false,
        },
        {
            value: 'Floppa',
            isCorrect: true,
        }
    ]
};

export const QUIZ_LIST: Quiz[] = [
    {
        id: '1',
        name: 'Les félins', // What's happening if I change this value..?
        theme: 'Les animaux',
        questions: [QUESTION_FLOPPA],
    },
    {
        id: '2',
        name: 'Les oiseaux',
        theme: 'Les animaux',
        questions: [],
    }
];
