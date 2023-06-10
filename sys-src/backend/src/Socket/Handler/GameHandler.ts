import { Socket } from 'socket.io';
import { gameMap } from '../../models/GameMap';
import { connectionList } from '../../models/ConnectionModel';

export const handleJoinGame = (socket: Socket, gameID: string) => {
    var connection = connectionList.find((c) => c.socket == socket);

    if (!connection) return;

    connection.gameID = gameID;

    var game = gameMap.get(gameID);

    if (!game) return;

    game.joinGame(connection.playerID);
};

//TODO: correct this way??
export const handleSetPlant = (
    socket: Socket,
    gameID: string,
    playerName: string,
    plant: Plant,
    xFields: number[],
    yFields: number[]
) => {
    var connection = connectionList.find((c) => c.socket == socket);
    if (!connection) return;

    var game = gameMap.get(gameID);
    if (!game) return;

    //TODO: additional Parameters?
    game.setPlantTile(playerName, plant);
};

//TODO: correct this way??
export const handleSetSplash = (
    socket: Socket,
    gameID: string,
    playerName: string,
    x: number,
    y: number
) => {
    var connection = connectionList.find((c) => c.socket == socket);
    if (!connection) return;

    var game = gameMap.get(gameID);
    if (!game) return;

    const splashVector = new Vector2(x, y);

    game.processSplash(playerName, splashVector);
};
