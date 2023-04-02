import { Quiz } from '../models/quiz.model';
import { Question } from '../models/question.model';
import { Association, Connectable, Connection } from '../models/association.model';

export const THEME_LIST: string[] = [
    'Les animaux',
    'Géographie',
    'Histoire',
    'Le sport',
    'Cuisine',
    'Musique'
]


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

export const QUESTION_FELINS_3: Question = {
    id: '3',
    label: 'Qui est le plus rapide ?',
    answers: [
        {
            value: 'Lion',
            isCorrect: false,
        },
        {
            value: 'Guépard',
            isCorrect: true,
        },
        {
            value: "Chat",
            isCorrect: false,
        },
    ]
};

export const QUESTION_FELINS_4: Question = {
    id: '4',
    label: "Lequel n'est pas un félin ?",
    answers: [
        {
            value: 'Chat',
            isCorrect: false,
        },
        {
            value: 'Chien',
            isCorrect: true,
        },
    ]
};

export const QUESTION_FELINS_5: Question = {
    id: '5',
    label: 'Qui est à la fois vivant et mort ?',
    answers: [
        {
            value: 'Méduse',
            isCorrect: true,
        },
        {
            value: 'Taureau',
            isCorrect: false,
        },
        {
            value: "Dragon",
            isCorrect: false,
        },
        {
            value: 'Chat',
            isCorrect: true,
        }
    ]
};


export const CONNECTION_FELIN_1: Connection = {
    valueToConnect: 'Tigre',
    valueToBeConnected: 'grrrrr'
}

export const CONNECTION_FELIN_2: Connection = {
    valueToConnect: 'Chat',
    valueToBeConnected: 'meow'
}

export const CONNECTION_FELIN_3: Connection = {
    valueToConnect: 'Lynx',
    valueToBeConnected: null
}

export const ASSOCIATION_FELINS_1: Association = {
    id: '1',
    label: 'Quel animal, quel son?',
    connections: [CONNECTION_FELIN_1, CONNECTION_FELIN_2, CONNECTION_FELIN_3],
    isCorrect: false
};


export const QUIZ_LIST: Quiz[] = [
    {
        id: '1',
        name: 'Les félins',
        theme: THEME_LIST[0],
        questions: [QUESTION_FELINS_1, QUESTION_FELINS_2, QUESTION_FELINS_3, QUESTION_FELINS_4, QUESTION_FELINS_5],
        associations: [ASSOCIATION_FELINS_1],
        users: []
    },
    {
        id: '2',
        name: 'Les oiseaux',
        theme: THEME_LIST[0],
        questions: [],
        associations: [],
        users: []
    }
];
