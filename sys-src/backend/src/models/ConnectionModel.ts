
export interface IConnectionState{

    playerID:string;
    connectionState: string;
    gameID: string;
    socketID: string;
}

export const connectionList: IConnectionState[] = [];