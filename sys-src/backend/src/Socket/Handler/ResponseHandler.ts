import {Socket} from "socket.io";
import {connectionList} from "../../models/ConnectionModel";
import {gameMap} from "../../models/GameMap";

export const handleTurnChanged = (playerNames: string[], playerNameCurrentTurn: string,  gameId : string) => {

    console.log("Turn changed message");
    let connections = connectionList.filter(c => playerNames.includes(c.playerID));

    connections = connections.filter(c => c.gameID == gameId);

    connections.forEach(c => {
        c.socket.emit('turnChanged', playerNameCurrentTurn);
    });
}

export const handleInitGame = (playerName: string, gameID:string, gamesize: number) => {

    console.log("Initialize game parameters");
    let connections = connectionList.filter(c => c.playerID == playerName);

    if(!connections) return;
    let connection = connections.find(c => c.gameID == gameID);

    if(!connection) return;
    connection.socket.emit('gameInit', gamesize);
}


export const handleStartGame = (playerNames: string[], gameId : string) => {

    console.log("Start game message");
    let connections = connectionList.filter(c => playerNames.includes(c.playerID));

    connections = connections.filter(c => c.gameID == gameId);

    connections.forEach(c => {
        let opponent = playerNames.filter(p => p != c.playerID)[0];
        c.socket.emit('startGame', opponent);
    });
}

export const handleSplash = (playerNames: string[], gameId: string, currentPlayer: string, splash: { hit: boolean; x: number; y: number; sunk: boolean }) => {

    let connections = connectionList.filter(c => playerNames.includes(c.playerID));

    connections = connections.filter(c => c.gameID == gameId);

    connections.forEach(c => {
        c.socket.emit('splash',currentPlayer, splash);
    });
}

export const handleGameOver = (playerNames: string[], gameId: string, winner: string) => {

    let connections = connectionList.filter(c => playerNames.includes(c.playerID));

    connections = connections.filter(c => c.gameID == gameId);

    connections.forEach(c => {
        c.socket.emit('gameOver', winner);
    });

    gameMap.delete(gameId);
}

