export interface Connectable {
    value: string;
    correctConnection?: Connectable;
    currentConnection?: Connectable;
    isConnected: boolean;
    isCorrect: boolean;
}

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