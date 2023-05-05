import { Quiz } from '../models/quiz.model';
import { Question } from '../models/question.model';
import { Association, Connection } from '../models/association.model';
import { Theme } from '../models/theme.model';

// export const THEME_LIST: string[] = [
//     'Les animaux',
//     'Géographie',
//     'Histoire',
//     'Le sport',
//     'Cuisine',
//     'Musique'
// ]



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
            isCorrect: false,
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

export const CONNECTION_FELIN_5: Connection = {
    valueToConnect: 'Chien',
    valueToBeConnected: 'Woaf'
}

export const CONNECTION_FELIN_6: Connection = {
    valueToConnect: 'Poussin',
    valueToBeConnected: 'Pioupiou'
}

export const CONNECTION_FELIN_7: Connection = {
    valueToConnect: 'Vache',
    valueToBeConnected: 'Meuuuu'
}

export const CONNECTION_FELIN_8: Connection = {
    valueToConnect: 'Cheval',
    valueToBeConnected: null
}

export const CONNECTION_FELIN_4: Connection = {
    valueToConnect: 'A connecter',
    valueToBeConnected: 'A être connecté'
}

export const ASSOCIATION_FELINS_2: Association = {
    id: '2',
    label: 'Quel animal, quel son?',
    connections: [CONNECTION_FELIN_1, CONNECTION_FELIN_2, CONNECTION_FELIN_3],
    isCorrect: false
};

export const ASSOCIATION_FELINS_1: Association = {
    id: '1',
    label: 'Connecte les 2 boutons !',
    connections: [CONNECTION_FELIN_4],
    isCorrect: false
};

export const ASSOCIATION_FELINS_3: Association = {
    id: '1',
    label: 'Quel animal fait quel son ?',
    connections: [CONNECTION_FELIN_5, CONNECTION_FELIN_6],
    isCorrect: false
};


export const THEME_QUIZ_LIST: Theme[] = [
    {
        id: 0,
        title: 'Les animaux', 
        description: null, 
        quizList: null, 
        coverImage: null
    },
    {
        id: 1,
        title: 'Géographie',
        description: null,
        quizList: null,
        coverImage: null
    }
]

export const QUIZ_LIST: Quiz[] = [
    {
        id: '1',
        name: 'Les félins',
        theme: THEME_QUIZ_LIST[0].title,
        questions: [QUESTION_FELINS_1, QUESTION_FELINS_2, QUESTION_FELINS_3, QUESTION_FELINS_4, QUESTION_FELINS_5],
        associations: [ASSOCIATION_FELINS_1, ASSOCIATION_FELINS_2, ASSOCIATION_FELINS_3],
        users: []
    },
    {
        id: '2',
        name: 'Les oiseaux',
        theme: THEME_QUIZ_LIST[0].title,
        questions: [],
        associations: [],
        users: []
    }
];

THEME_QUIZ_LIST[0].quizList = QUIZ_LIST;