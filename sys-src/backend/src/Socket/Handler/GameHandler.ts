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
    plantTiles : { position: {x : number, y : number} }[]
) => {
    console.log("Received set plant message from socket: " + socket.id)
    console.log("Plant tiles: " + plantTiles);
    var connection = connectionList.find((c) => c.socket == socket);
    if (!connection) return;

    var game = gameMap.get(connection.gameID);
    if (!game) return;

    const mappedPlantTile = plantTiles.map((tile) => {
        return new PlantTile(new Vector2(tile.position.x, tile.position.y), false);
    });

    console.log("Plant tiles: " + mappedPlantTile);

    game.setPlantTile(connection.playerID, mappedPlantTile);
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
