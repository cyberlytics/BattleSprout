import {
    handleGameOver,
    handleSplash, handleStartGame,
    handleTurnChanged,
    handleInitGame,
} from '../Socket/Handler/ResponseHandler';
import {PlantTile} from "./PlantTile";
import {Vector2} from "./Vector2";
import {Plant} from "./Plant";
import {Board} from "./Board";

enum GameState {
    JOINING,
    SETUP,
    PLAYING,
}

class Player {
    name: string;
    board: Board;
    ready: boolean;

    constructor(name: string) {
        this.name = name;
        this.board = new Board();
        this.ready = false;
    }
}

export class Game {
    private players: Player[];
    private currentPlayerIndex: number;
    private gameState: GameState;

    private gameId: string;
    private gameSize: number;

    constructor(gameId: string, gameSize: number){
        this.players = [];
        this.currentPlayerIndex = 0;
        this.gameState = GameState.JOINING;
        this.gameId = gameId;
        this.gameSize = gameSize;
    }

    public joinGame(playerName: string): void {

        handleInitGame(playerName, this.gameId, this.gameSize);

        if (this.players.length >= 2) {
            return;
        }

        console.log('Player joined game: ' + playerName)

        this.players.push(new Player(playerName));

        this.gameState = GameState.SETUP;

        

    }

    public setPlantTile(playerName: string, plantTiles: PlantTile[]): void {
        if (this.gameState !== GameState.SETUP) {
            throw new Error('Cannot set plant tile in current state.');
        }

        console.log('Player set plant tile: ' + playerName + plantTiles)
        var plant = new Plant(plantTiles);

        const player = this.getPlayerByName(playerName);
        player.board.addPlant(plant);
    }

    public playerReady(playerName: string): void {

        if (this.gameState !== GameState.SETUP) {
            return;
        }


        const player = this.getPlayerByName(playerName);
        player.ready = true;

        if (this.players.every((p) => p.ready) && this.players.length == 2) {
            this.gameState = GameState.PLAYING;
            handleStartGame(this.players.map((p) => p.name), this.gameId);
            this.changeTurn();
        }


    }

    public processSplash(playerName: string, splash: Vector2): void {
        if (this.gameState !== GameState.PLAYING) {
            throw new Error('Cannot process splash in current state.');
        }

        const player = this.getPlayerByName(playerName);

        if (player !== this.players[this.currentPlayerIndex]) {
            throw new Error('Not your turn.');
        }

        const opponent = this.players[(this.currentPlayerIndex + 1) % 2];
        const splashResult = opponent.board.splashTile(splash);

        if (!splashResult.hit) {
            this.changeTurn();
        }

        if (splashResult.sunk) {

            if(opponent.board.isBoardEndState()){

                handleGameOver(this.getNameOfAllPlayers(), this.gameId, player.name);
            }

        }

        const message = {
            x: splash.x,
            y: splash.y,
            hit: splashResult.hit,
            sunk: splashResult.sunk,
        };

        handleSplash(this.getNameOfAllPlayers(),this.gameId, player.name, message);
    }

    private getNameOfAllPlayers(): string[] {
        return this.players.map((p) => p.name);
    }

    private getPlayerByName(playerName: string): Player {
        const player = this.players.find((p) => p.name === playerName);

        if (!player) {
            throw new Error(`Player ${playerName} not found.`);
        }

        return player;
    }

    private changeTurn(): void {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % 2 ;

        handleTurnChanged(
            this.getNameOfAllPlayers(),
            this.players[this.currentPlayerIndex].name,
            this.gameId
        );
    }
}
