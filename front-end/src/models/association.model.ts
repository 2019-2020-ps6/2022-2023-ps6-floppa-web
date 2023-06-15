export interface Connection {
    valueToConnect: string;
    imageCoverToConnect?: string;
    valueToBeConnected: string;
    imageCoverToBeConnected?: string;
}

export interface Association {
    id?: string;
    label: string;
    connections?: Connection[];
    isCorrect?: boolean;
}