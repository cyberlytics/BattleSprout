import {Socket} from "socket.io";
import {gameMap} from "../../models/GameMap";
import {connectionList} from "../../models/ConnectionModel";


export const handleJoinGame = ( socket: Socket, gameID: string) => {

    var connection = connectionList.find(c => c.socket == socket);

    if(connection == undefined){
        return;
    }

    connection.gameID = gameID;

    var game = gameMap.get(gameID);

    if(game == undefined){
        return;
    }

    game.joinGame(connection.playerID);


}