import {Socket} from "socket.io";

export interface IConnectionState{

    playerID:string;
    connectionState: string;
    gameID: string;
    socket : Socket;
}

export const connectionList: IConnectionState[] = [];