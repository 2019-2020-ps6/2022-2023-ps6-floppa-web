export interface Connectable {
    label: string;
    correctConnection: Connectable;
    currentConnection: Connectable;
    isConnected: boolean;
    isCorrect: boolean;
}

export interface Association {
    id: string;
    label: string;
    toConnect: Connectable[];
    toBeConnected: Connectable[];
}