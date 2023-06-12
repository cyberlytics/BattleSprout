import {Socket} from "socket.io";
import {connectionList} from "../../models/ConnectionModel";

export const handleTurnChanged = (playerNames: string[], playerNameCurrentTurn: string) => {


    var connections = connectionList.filter(c => playerNames.includes(c.playerID));

    connections.forEach(c => {
        c.socket.emit('turnChanged', playerNameCurrentTurn);
    });
}


export const handleSplash = (playerNames: string[], splash: { hit: boolean; x: number; y: number; sunk: boolean }) => {

    var connections = connectionList.filter(c => playerNames.includes(c.playerID));

    connections.forEach(c => {
        c.socket.emit('splash', splash);
    });
}

