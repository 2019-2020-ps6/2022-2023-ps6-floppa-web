export interface Connection {
    valueToConnect: string;
    valueToBeConnected: string;
}

export interface Association {
    id: string;
    label: string;
    connections: Connection[];
    isCorrect: boolean;
}