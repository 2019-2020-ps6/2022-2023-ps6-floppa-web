import { User } from '../models/user.model';


export const USER_LIST: User[] = [
    {
        id: "1",
        firstName: "Madeleine",
        lastName: "Duo",
        alzheimerStade: "stade léger",
        assistance : "1000",
        photo: "/assets/users/Madeleine.png",
        /*numberPlayed: 12,
        lastGame: 0,
        favoriteQuiz: "Les félins",*/
        quizSessions: {
            "1": {
                date: 1682453600000,
                quizId: "1",
                answers: [true, true, false,false,false,true]
            },
            "2": {
                date: 1682453600000,
                quizId: "1",
                answers: [true, true, false,false,false,true]
            },
            "3": {
                date: 1682553600000,
                quizId: "2",
                answers: [true, true, false,true,false,false]
            },
            "4": {
                date: 1682553600000,
                quizId: "1",
                answers: [true, true, true,true,false,true]
            },
            "5": {
                date: 1682640000000,
                quizId: "1",
                answers: [true, true, true,true,false,false]
            }
        }
    },
    {
        id: "2",
        firstName: "Jaques",
        lastName: "Quatro",
        alzheimerStade: "stade intermédiaire",
        assistance : "1001",
        photo: "/assets/users/Jacques.png",
        quizSessions: {
            "1": {
                date: 1682640000000,
                quizId: "1",
                answers: [true, true, false,false,false,true]
            },
            "2": {
                date: 1682553600000,
                quizId: "2",
                answers: [true, true, false,false,false,true]
            },
            "3": {
                date: 1682553600000,
                quizId: "1",
                answers: [true, true, false,false,false,true]
            }
        }
    },
    {
        id: "3",
        firstName:"Valerie",
        lastName:"Pentacle",
        alzheimerStade:"stade avancé",
        assistance : "1111",
        photo:"/assets/users/Valérie.png",
        quizSessions: {
            "1": {
                date: 1682640000000,
                quizId: "1",
                answers: [true, true, false,false,false,true]
            },
            "2": {
                date: 1682553600000,
                quizId: "2",
                answers: [true, true, false,false,false,true]
            },
            "3": {
                date: 1682553600000,
                quizId: "1",
                answers: [true, true, false,false,false,true]
            }
        }
    }
]