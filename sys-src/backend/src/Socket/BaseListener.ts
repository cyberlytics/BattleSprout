import {Socket} from "socket.io";
import {handleAuthenticate, handleDisconnect, handleHandshake} from "./Handler/ConnectionHandler";

export const baseListener = (socket: Socket) => {

    socket.on('handshake', () => handleHandshake(socket));
    socket.on('authenticate', (message: string) => {handleAuthenticate(socket, message)});


    socket.on('disconnect', () => handleDisconnect(socket));


}




