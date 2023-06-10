
import {handleSplash, handleTurnChanged} from "../Socket/Handler/ResponseHandler";

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

    constructor() {
        this.players = [];
        this.currentPlayerIndex = 0;
        this.gameState = GameState.JOINING;
    }

    public joinGame(playerName: string): void {
        if (this.gameState !== GameState.JOINING || this.players.length >= 2) {
            throw new Error("Cannot join game in current state or game is full.");
        }

        this.players.push(new Player(playerName));

        if (this.players.length === 2) {
            this.gameState = GameState.SETUP;
        }
    }

    public setPlantTile(playerName: string, plant: Plant): void {
        if (this.gameState !== GameState.SETUP) {
            throw new Error("Cannot set plant tile in current state.");
        }

        const player = this.getPlayerByName(playerName);
        player.board.addPlant(plant);
    }

    public playerReady(playerName: string): void {
        if (this.gameState !== GameState.SETUP) {
            throw new Error("Cannot mark player ready in current state.");
        }

        const player = this.getPlayerByName(playerName);
        player.ready = true;

        if (this.players.every(p => p.ready)) {
            this.gameState = GameState.PLAYING;
        }
    }

    public processSplash(playerName: string, splash: Vector2): void {
        if (this.gameState !== GameState.PLAYING) {
            throw new Error("Cannot process splash in current state.");
        }

        const player = this.getPlayerByName(playerName);

        if (player !== this.players[this.currentPlayerIndex]) {
            throw new Error("Not your turn.");
        }

        const opponent = this.players[(this.currentPlayerIndex + 1) % 2];
        const splashResult = opponent.board.splashTile(splash);

        if (!splashResult.hit) {
            this.changeTurn();
        }

        if (splashResult.sunk) {
            opponent.board.isBoardEndState();
        }

        var message = { x: splash.x, y: splash.y, hit: splashResult.hit, sunk: splashResult.sunk };

        handleSplash(this.getNameOfAllPlayers(), message);

    }

    private getNameOfAllPlayers(): string[] {
        return this.players.map(p => p.name);
    }

    private getPlayerByName(playerName: string): Player {
        const player = this.players.find(p => p.name === playerName);

        if (!player) {
            throw new Error(`Player ${playerName} not found.`);
        }

        return player;
    }

    private changeTurn(): void {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % 2;


        handleTurnChanged(this.getNameOfAllPlayers() , this.players[this.currentPlayerIndex].name);
    }
}