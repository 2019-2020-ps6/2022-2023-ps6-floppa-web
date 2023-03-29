import { Quiz } from '../models/quiz.model';
import { Question } from '../models/question.model';

export const QUESTION_FELINS_1: Question = {
    id: '1',
    label: 'Qui est le caracal ?',
    answers: [
        {
            value: 'Capy',
            isCorrect: false,
        },
        {
            value: 'Dino',
            isCorrect: false,
        },
        {
            value: 'Floppa',
            isCorrect: true,
        },
        {
            value: 'Platypus',
            isCorrect: false,
        }
    ]
};

export const QUESTION_FELINS_2: Question = {
    id: '2',
    label: 'Qui est le tigre blanc ?',
    answers: [
        {
            value: 'Tigre',
            isCorrect: true,
        },
        {
            value: 'Orvet',
            isCorrect: false,
        },
        {
            value: "Panda-Roux",
            isCorrect: false,
        },
        {
            value: 'Crocodile',
            isCorrect: false,
        }
    ]
};

export const QUIZ_LIST: Quiz[] = [
    {
        id: '1',
        name: 'Les félins', // What's happening if I change this value..?
        theme: 'Les animaux',
        questions: [QUESTION_FELINS_1, QUESTION_FELINS_2],
        associations: null
    },
    {
        id: '2',
        name: 'Les oiseaux',
        theme: 'Les animaux',
        questions: [],
        associations: null
    }
];
