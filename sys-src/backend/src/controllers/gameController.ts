import initializeGameBoard from "../utilities/gameLogic"
import {Game} from "../game/Game"
import {gameMap} from "../models/GameMap";

const createNewGame = (req: any, res:any) =>{
    //TODO:Test if sending http request and initializing board works


    var randomGameId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const game = new Game();

    gameMap.set(randomGameId, game);


    res.status(200).json({gameId: randomGameId});
}

export default createNewGame;

