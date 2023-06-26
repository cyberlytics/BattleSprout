import {Socket} from "socket.io";
import {connectionList} from "../../models/ConnectionModel";
import tokenService from "../../utilities/tokenService";

export const handleHandshake = (socket: Socket) => {

    connectionList.push({ playerID: '', connectionState: 'handshake', gameID: '', socket: socket });
    console.log('Client connected: ' + socket.id);
}

export const handleAuthenticate = (socket: Socket, token: string) => {

    const connection = connectionList.find(c => c.socket.id == socket.id);

    let payload = tokenService.verify(token)
    let playerId = payload.info;

    if(connection){
        connection.playerID = playerId;
    }
}

export const handleDisconnect = (socket: Socket) => {

    connectionList.filter(c => c.socket.id != socket.id);
    console.log('Client disconnected: ' + socket.id);
}