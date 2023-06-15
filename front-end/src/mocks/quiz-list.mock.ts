import { Quiz } from '../models/quiz.model';
import { Question } from '../models/question.model';
import { Association, Connection } from '../models/association.model';
import { Theme } from '../models/theme.model';
import { Password } from '../models/password.model';

export const password: Password = {
    password: '0000'
}

export const QUESTION_FELINS_1: Question = {
    id: '1',
    label: 'Qui est le caracal ?',
    quizId:1,
    answers: [
        {
            value: 'Photo N°1',
            isCorrect: false,
            img:"/assets/quiz-1/question-1/img-1.jpg",
            questionId:1
            
        },
        {
            value: 'Photo N°2',
            isCorrect: false,
            img:"/assets/quiz-1/question-1/img-2.jpg",
            questionId:1
        },
        {
            value: 'Photo N°3',
            isCorrect: true,
            img:"/assets/quiz-1/question-1/img-3.jpg",
            questionId:1
            
        },
        {
            value: 'Photo N°4',
            isCorrect: false,
            img:"/assets/quiz-1/question-1/img-4.jpg",
            questionId:1
        }
    ]
};

export const QUESTION_FELINS_2: Question = {
    id: '2',
    label: 'Qui est le tigre blanc ?',
    quizId:1,
    answers: [
        {
            value: 'Photo N°1',
            isCorrect: true,
            img:"/assets/quiz-1/question-2/img-1.jpg",
            questionId:2
        },
        {
            value: 'Photo N°2',
            isCorrect: false,
            img:"/assets/quiz-1/question-2/img-2.jpg",
            questionId:2
        },
        {
            value: "Photo N°3",
            isCorrect: false,
            img:"/assets/quiz-1/question-2/img-3.jpg",
            questionId:2
        },
        {
            value: 'Photo N°4',
            isCorrect: false,
            img:"/assets/quiz-1/question-2/img-4.jpg",
            questionId:2
        }
    ]
};

export const QUESTION_FELINS_3: Question = {
    id: '3',
    label: 'Qui est le plus rapide ?',
    quizId:1,
    answers: [
        {
            value: 'Lion',
            isCorrect: false,
            img:"/assets/quiz-1/question-3/img-1.jpg",
            questionId:3
        },
        {
            value: 'Guépard',
            isCorrect: true,
            img:"/assets/quiz-1/question-3/img-2.jpg",
            questionId:3
        },
        {
            value: "Chat",
            isCorrect: false,
            img:"/assets/quiz-1/question-3/img-3.jpg",
            questionId:3
        },
    ]
};

export const QUESTION_FELINS_4: Question = {
    id: '4',
    label: "Lequel n'est pas un félin ?",
    quizId:1,
    answers: [
        {
            value: 'Chat',
            isCorrect: false,
            img:"/assets/quiz-1/question-4/img-1.jpg",
            questionId:4
        },
        {
            value: 'Chien',
            isCorrect: true,
            img:"/assets/quiz-1/question-4/img-2.jpg",
            questionId:4
        },
    ]
};

export const QUESTION_FELINS_5: Question = {
    id: '5',
    label: 'Qui est à la fois vivant et mort ?',
    quizId:1,
    answers: [
        {
            value: 'Méduse',
            isCorrect: false,
            img:"/assets/quiz-1/question-5/img-1.jpg",
            questionId:5
        },
        {
            value: 'Taureau',
            isCorrect: false,
            img:"/assets/quiz-1/question-5/img-2.jpg",
            questionId:5
        },
        {
            value: "Dragon",
            isCorrect: false,
            img:"/assets/quiz-1/question-5/img-3.jpg",
            questionId:5
        },
        {
            value: 'Chat de Schrödinger',
            isCorrect: true,
            img:"/assets/quiz-1/question-5/img-4.jpg",
            questionId:5
        }
    ]
};


export const CONNECTION_FELIN_1: Connection = {
    valueToConnect: 'Tigre',
    valueToBeConnected: 'grrrrr',
    imageCoverToConnect: "/assets/quiz-1/question-2/img-1.jpg",
    imageCoverToBeConnected: null
}

export const CONNECTION_FELIN_2: Connection = {
    valueToConnect: 'Chat',
    valueToBeConnected: 'meow',
    imageCoverToConnect: "/assets/quiz-1/question-3/img-3.jpg",
    imageCoverToBeConnected: null
}

export const CONNECTION_FELIN_3: Connection = {
    valueToConnect: 'Caracal',
    valueToBeConnected: null,
    imageCoverToConnect: "/assets/quiz-img/quiz-1.jpg",
    imageCoverToBeConnected: null
}

export const CONNECTION_FELIN_5: Connection = {
    valueToConnect: 'Chien',
    valueToBeConnected: 'Woaf',
    imageCoverToConnect: null,
    imageCoverToBeConnected: null
}

export const CONNECTION_FELIN_6: Connection = {
    valueToConnect: 'Poussin',
    valueToBeConnected: 'Pioupiou',
    imageCoverToConnect: null,
    imageCoverToBeConnected: null
}

export const CONNECTION_FELIN_7: Connection = {
    valueToConnect: 'Vache',
    valueToBeConnected: 'Meuuuu',
    imageCoverToConnect: null,
    imageCoverToBeConnected: null
}

export const CONNECTION_FELIN_8: Connection = {
    valueToConnect: 'Cheval',
    valueToBeConnected: null,
    imageCoverToConnect: null,
    imageCoverToBeConnected: null
}

export const CONNECTION_FELIN_4: Connection = {
    valueToConnect: 'A connecter',
    valueToBeConnected: 'A être connecté',
    imageCoverToConnect: null,
    imageCoverToBeConnected: null
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
        coverImage: "/assets/theme-img/theme-1.jpg"
    },
    {
        id: 1,
        title: 'Géographie',
        description: null, 
        coverImage: "/assets/theme-img/theme-2.jpg"
    },
    {
        id: 2,
        title: 'Histoire',
        description: null, 
        coverImage: "/assets/theme-img/theme-3.jpg"
    },
    {
        id: 3,
        title: 'Le sport',
        description: null, 
        coverImage: "/assets/theme-img/theme-4.jpg"
    },
    {
        id: 4,
        title: 'Cuisine',
        description: null, 
        coverImage: "/assets/theme-img/theme-5.jpg"
    },
    {
        id: 5,
        title: 'Musique',
        description: null, 
        coverImage: "/assets/theme-img/theme-6.jpg"
    },
]

export const QUIZ_LIST: Quiz[] = [
    {
        id: '1',
        name: 'Les félins',
        theme: THEME_QUIZ_LIST[0].title,
        questions: [QUESTION_FELINS_1, QUESTION_FELINS_2, QUESTION_FELINS_3, QUESTION_FELINS_4, QUESTION_FELINS_5],
        associations: [ASSOCIATION_FELINS_1, ASSOCIATION_FELINS_2, ASSOCIATION_FELINS_3],
        users: [],
        coverImage: '/assets/quiz-img/quiz-1.jpg'
    },
    {
        id: '2',
        name: 'Les oiseaux',
        theme: THEME_QUIZ_LIST[0].title,
        questions: [],
        associations: [],
        users: ["1","3"],
        coverImage: '/assets/quiz-img/quiz-2.jpg'
    },
];