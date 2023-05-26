import Plant from "../models/plantModel";

export interface Game{
    player1:string;
    player2:string;
    board:Plant[][];
    status:string;
    currentPlayer: string;
    }
export default Game;

