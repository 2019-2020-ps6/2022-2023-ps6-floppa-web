export interface User {
    id: string;
    firstName: string;
    lastName: string;
    alzheimerStade: string;
    assistance: string;
    photo: string;
    quizSessions: { [idQuiz: string]: QuizSession };
    timer: number;
}

export interface QuizSession {
    date: number;
    quizId: string;
    answers: boolean[];
    timePerQuestion: number[];
    userId: string,
}