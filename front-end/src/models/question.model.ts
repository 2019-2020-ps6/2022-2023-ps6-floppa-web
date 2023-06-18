export interface Answer {
    value: string;
    isCorrect: boolean;
    img: string;
    questionId: number;
}

export interface Question {
    id?: string;
    label: string;
    answers?: Answer[];
    quizId: number;
}
