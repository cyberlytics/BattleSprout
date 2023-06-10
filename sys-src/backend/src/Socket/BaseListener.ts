import { Socket } from 'socket.io';
import {
    handleAuthenticate,
    handleDisconnect,
    handleHandshake,
} from './Handler/ConnectionHandler';
import { handleJoinGame } from './Handler/GameHandler';

export const baseListener = (socket: Socket) => {
    socket.on('handshake', () => handleHandshake(socket));
    socket.on('authenticate', (message: string) => {
        handleAuthenticate(socket, message);
    });
    socket.on('joinGame', (gameID: string) => {
        handleJoinGame(socket, gameID);
    });

    socket.on('disconnect', () => handleDisconnect(socket));
};
