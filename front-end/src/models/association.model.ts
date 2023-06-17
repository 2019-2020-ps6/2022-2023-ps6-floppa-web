export interface Connection {
    valueToConnect: string;
    coverImageToConnect?: string;
    valueToBeConnected: string;
    coverImageToBeConnected?: string;
}

export interface Association {
    id?: string;
    label: string;
    connections?: Connection[];
    isCorrect?: boolean;
}