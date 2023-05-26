import initializeGameBoard from "../utilities/gameLogic"
import Game from "../models/GameModel"

const createNewGame = (req, res) =>{
    //TODO:Test if sending http request and initializing board works
    const boardRows = req.body.boardRows;
    const boardCols = req.body.boardCols;

    const gameBoard = initializeGameBoard(boardRows,boardCols);

    //Setup a new game
    const newGame: Game = {
        player1: 'Player1',
        player2: 'Player2',
        board: gameBoard,
        status: 'Setup',
        currentPlayer: 'Player1',
    }


    const response = {
        //TODO: Generate random gameID?
        gameId: '123456',
        game: newGame,
        
    };

    res.status(200).json(response);
}

export default createNewGame;

