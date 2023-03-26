export interface Association{
    label: string;
    toConnect: Connectable[];
    toBeConnected: Connectable[];
}

export interface Connectable{
    label: string;
    image: string;
    correctConnection: Connectable;
    currentConnection: Connectable;
    isConnected: boolean;
    isCorrect: boolean;
}