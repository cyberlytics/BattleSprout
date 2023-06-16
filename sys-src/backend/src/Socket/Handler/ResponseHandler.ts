import {Socket} from "socket.io";
import {connectionList} from "../../models/ConnectionModel";

export const handleTurnChanged = (playerNames: string[], playerNameCurrentTurn: string,  gameId : string) => {

    console.log("Turn changed message");
    var connections = connectionList.filter(c => playerNames.includes(c.playerID));

    connections = connections.filter(c => c.gameID == gameId);

    connections.forEach(c => {
        c.socket.emit('turnChanged', playerNameCurrentTurn);
    });
}


export const handleStartGame = (playerNames: string[], gameId : string) => {

    console.log("Start game message");
    var connections = connectionList.filter(c => playerNames.includes(c.playerID));

    connections = connections.filter(c => c.gameID == gameId);

    connections.forEach(c => {
        c.socket.emit('startGame');
    });
}

export const handleSplash = (playerNames: string[], gameId: string, currentPlayer: string, splash: { hit: boolean; x: number; y: number; sunk: boolean }) => {

    var connections = connectionList.filter(c => playerNames.includes(c.playerID));

    connections = connections.filter(c => c.gameID == gameId);

    connections.forEach(c => {
        c.socket.emit('splash',currentPlayer, splash);
    });
}

