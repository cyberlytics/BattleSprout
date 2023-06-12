import { Socket } from 'socket.io';
import {
    handleAuthenticate,
    handleDisconnect,
    handleHandshake,
} from './Handler/ConnectionHandler';
import {handleJoinGame, handleSetPlant, handleSetSplash} from './Handler/GameHandler';

export const baseListener = (socket: Socket) => {
    socket.on('handshake', () => handleHandshake(socket));
    socket.on('authenticate', (message: string) => {
        handleAuthenticate(socket, message);
    });
    socket.on('joinGame', (gameID: string) => {
        handleJoinGame(socket, gameID);
    });

    socket.on('setPlant', (gameID: string, playerName: string, plantTiles: PlantTile[]) => {
        handleSetPlant(socket, gameID, playerName, plantTiles);
    });

    socket.on('setSplash', (gameID: string, playerName: string, x: number, y: number) => {
        handleSetSplash(socket, gameID, playerName, x, y);
    });

    socket.on('disconnect', () => handleDisconnect(socket));
};
