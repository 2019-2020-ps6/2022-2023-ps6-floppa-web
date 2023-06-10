export interface User {
    firstName: string;
    lastName: string;
    alzheimerStade: string;
    assistance: string;
    photo: string;
    quizSessions: QuizSession[];
    timer: number;
}

export interface QuizSession {
    date: number;
    quizId: string;
    answers: boolean[];
    timePerQuestion: number[];
}