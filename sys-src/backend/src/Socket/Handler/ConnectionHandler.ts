import {Socket} from "socket.io";
import {connectionList} from "../../models/ConnectionModel";


export const handleHandshake = (socket: Socket) => {

    connectionList.push({ playerID: '', connectionState: 'handshake', gameID: '', socket: socket });
    console.log('Client connected: ' + socket.id);
}

export const handleAuthenticate = (socket: Socket, message: string) => {

    var authMessage = JSON.parse(message);

    const connection = connectionList.find(c => c.socket.id == socket.id);

    if(connection){
        connection.playerID = "test";
    }
}

export const handleDisconnect = (socket: Socket) => {

    connectionList.filter(c => c.socket.id != socket.id);
    console.log('Client disconnected: ' + socket.id);
}