import { Game } from '../../game/Game';
import { PlantTile } from "../../game/PlantTile";

jest.mock('../../Socket/Handler/ResponseHandler', () => ({
    handleGameOver: jest.fn(),
    handleSplash: jest.fn(),
    handleStartGame: jest.fn(),
    handleTurnChanged: jest.fn(),
    handleInitGame: jest.fn(),
}));

describe('Game class', () => {
    let gameId: string;
    let gameSize: number;
    let game: Game;

    beforeEach(() => {
        gameId = 'test-game-id';
        gameSize = 10;
        game = new Game(gameId, gameSize);
    });

    test('joinGame should allow a player to join the game in setup state', () => {
        game.joinGame('player1');

        expect(() => {
            game.setPlantTile('player1', [new PlantTile({x: 0, y: 0}, false)]);
        }).not.toThrow();
    });

    test('setPlantTile should set plant tiles for a player while setup state', () => {
        game.joinGame('player1');

        expect(() => {
            game.setPlantTile('player1', [new PlantTile({x: 0, y: 0}, false)]);
        }).not.toThrow();
    });

    test('processSplash should not throw an error if processSplash is called with the player which turn it is when all player joined', () => {
        game.joinGame('player1');
        game.joinGame('player2');
        game.playerReady('player1');
        game.playerReady('player2');

        expect(() => {
            game.processSplash('player2', {x: 0, y: 0});
        }).not.toThrow();
    });

    test('processSplash should throw error if not in playing state', () => {
        game.joinGame('player1');

        expect(() => {
            game.processSplash('player1', {x: 0, y: 0});
        }).toThrow('Cannot process splash in current state.');
    });

    test('processSplash should throw error if not the player\'s turn', () => {
        game.joinGame('player1');
        game.joinGame('player2');
        game.playerReady('player1');
        game.playerReady('player2');

        expect(() => {
            game.processSplash('player1', {x: 0, y: 0});
        }).toThrow('Not your turn.');
    });
});