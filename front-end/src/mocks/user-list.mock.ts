import { User } from '../models/user.model';


export const USER_LIST: User[] = [
    {
        id: "1",
        firstName: "Madeleine",
        lastName: "Duo",
        alzheimerStade: "stade léger",
        assistance : "1000",
        photo: "/assets/users/Madeleine.png",
        numberPlayed: 12,
        lastGame: 0,
        favoriteQuiz: "Les félins"
    },
    {
        id: "2",
        firstName: "Jaques",
        lastName: "Quatro",
        alzheimerStade: "stade intermédiaire",
        assistance : "1001",
        photo: "/assets/users/Jacques.png",
        numberPlayed: 24,
        lastGame: 1,
        favoriteQuiz: "Les oiseaux"
    },
    {
        id: "3",
        firstName:"Valerie",
        lastName:"Pentacle",
        alzheimerStade:"stade avancé",
        assistance : "1111",
        photo:"/assets/users/Valérie.png",
        numberPlayed: 36,
        lastGame: 3,
        favoriteQuiz: "Les félins"
    }
]