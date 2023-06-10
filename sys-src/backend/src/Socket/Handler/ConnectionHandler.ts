import {Socket} from "socket.io";
import {connectionList} from "../../models/ConnectionModel";


export const handleHandshake = (socket: Socket) => {

    connectionList.push({ playerID: '', connectionState: 'handshake', gameID: '', socketID: socket.id });

}

export const handleAuthenticate = (socket: Socket, message: string) => {

    var authMessage = JSON.parse(message);

    const connection = connectionList.find(c => c.socketID == socket.id);

}

export const handleDisconnect = (socket: Socket) => {

    connectionList.filter(c => c.socketID != socket.id);
    console.log('Client disconnected: ' + socket.id);
}