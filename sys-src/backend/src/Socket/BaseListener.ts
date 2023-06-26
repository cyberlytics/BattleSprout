import { Socket } from 'socket.io';
import {
    handleAuthenticate,
    handleDisconnect,
    handleHandshake,
} from './Handler/ConnectionHandler';
import {handleJoinGame, handleReady, handleSetPlant, handleSetSplash} from './Handler/GameHandler';
import { PlantTile } from '../game/PlantTile';
import {Vector2} from "../game/Vector2";

export const baseListener = (socket: Socket) => {
    socket.on('handshake', () => handleHandshake(socket));
    socket.on('authenticate', (token: string) => {
        handleAuthenticate(socket, token);
    });
    socket.on('joinGame', (gameID: string) => {
        handleJoinGame(socket, gameID);
    });

    socket.on('setPlant', ( plantTiles) => {
        handleSetPlant(socket ,plantTiles);
    });

    socket.on('setSplash', ( position: Vector2 ) => {
        handleSetSplash(socket, position );

    });

    socket.on('disconnect', () => handleDisconnect(socket));

    socket.on('playerReady', (gameID: string) => {
        handleReady(socket, gameID);
    });
};
