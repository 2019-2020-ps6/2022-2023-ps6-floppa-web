export interface User {
    id:string;
    firstName: string;
    lastName: string;
    alzheimerStade: string;
    assistance: string;
    photo: string;
    quizSessions: QuizSession[];
    timer: number;
}

export interface QuizSession {
    id?: number;
    date: number;
    quizId: string;
    answers: boolean[];
    timePerQuestion: number[];
    userId: string,
}