export interface Answer {
    value: string;
    isCorrect: boolean;
    img: string;
}

export interface Question {
    id: string;
    label: string;
    answers: Answer[];
}
