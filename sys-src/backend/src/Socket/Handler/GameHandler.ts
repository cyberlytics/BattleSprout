import { Socket } from 'socket.io';
import { gameMap } from '../../models/GameMap';
import { connectionList } from '../../models/ConnectionModel';
import {PlantTile} from "../../game/PlantTile";
import {Vector2} from "../../game/Vector2";
import {handleStartGame} from "./ResponseHandler";

export const handleJoinGame = (socket: Socket, gameID: string) => {
    var connection = connectionList.find((c) => c.socket == socket);

    if (!connection) return;

    console.log('Client joined game: ' + gameID)
    connection.gameID = gameID;

    var game = gameMap.get(gameID);

    if (!game) return;

    game.joinGame(connection.playerID);
};

export const handleReady = (socket: Socket, gameID: string) => {

    console.log("Received ready message from socket: " + socket.id + " for game: " + gameID)
    var connection = connectionList.find((c) => c.socket == socket);

    if (!connection) return;

    console.log("Connection found")

    var game = gameMap.get(gameID);

    console.log("Game found")

    if (!game) return;
    console.log("Player ready")
    game.playerReady(connection.playerID);
}

//TODO: correct this way??
export const handleSetPlant = (
    socket: Socket,
    plantTiles: PlantTile[]
) => {
    console.log("Received set plant message from socket: " + socket.id)
    console.log("Plant tiles: " + plantTiles);
    let connection = connectionList.find((c) => c.socket == socket);
    if (!connection) return;

    let game = gameMap.get(connection.gameID);
    if (!game) return;

    console.log("Plant tiles: " + plantTiles);

    game.setPlantTile(connection.playerID, plantTiles);
};

export const handleSetSplash = (
    socket: Socket,
    splashVector: Vector2
) => {


    console.log("Received set splash message from socket: " + socket.id)
    var connection = connectionList.find((c) => c.socket == socket);
    if (!connection) return;
    console.log("position: " + splashVector);
    var game = gameMap.get(connection.gameID);
    if (!game) return;



    game.processSplash(connection.playerID, splashVector);
};
