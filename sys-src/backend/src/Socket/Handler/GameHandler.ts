import { Socket } from 'socket.io';
import { gameMap } from '../../models/GameMap';
import { connectionList } from '../../models/ConnectionModel';
import {PlantTile} from "../../game/PlantTile";
import {Vector2} from "../../game/Vector2";

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
    plantTiles : PlantTile[]
) => {
    var connection = connectionList.find((c) => c.socket == socket);
    if (!connection) return;

    var game = gameMap.get(gameID);
    if (!game) return;

    game.setPlantTile(playerName, plantTiles);
};

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
