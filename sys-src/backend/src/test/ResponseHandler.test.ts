import { Socket } from 'socket.io';
import { handleTurnChanged,handleGameOver,handleSplash,handleStartGame } from '../Socket/Handler/ResponseHandler';
import { connectionList, IConnectionState } from '../models/ConnectionModel';
import { gameMap } from '../models/GameMap';
import { Game } from '../game/Game';

describe('ResponseHandler', ()=>{
    let initialConnectionList :IConnectionState[];
    let emitMock :jest.Mock;
    beforeEach(async ()=>{
     emitMock = jest.fn();
        const socket1: Socket = {
            id: 'socket123',
            emit: emitMock,
        } as unknown as Socket; 
          const socket2: Socket = {
              id: 'socket456',
              emit: emitMock,
          } as unknown as Socket; 
          const socket3: Socket = {
              id: 'socket789',
              emit: emitMock,
          } as unknown as Socket; 
         initialConnectionList = [
            { playerID: '123', connectionState: '', gameID: 'game123', socket: socket1 },
            { playerID: '456', connectionState: '', gameID: 'game123', socket: socket2 },
            { playerID: '789', connectionState: '', gameID: 'game456', socket: socket3 },
          ];

    });
    afterEach(()=>{
        connectionList.splice(0, connectionList.length);
    });

    test('handleTurnChanged',()=>{
        //Arrange
        const playerNames = ['123','456','789'];
        const gameId = 'game123';
        const playerNameCurrentTurn = '123';

        connectionList.push(...initialConnectionList);


        // Act
        handleTurnChanged(playerNames ,playerNameCurrentTurn ,gameId);

        const connections = connectionList.filter((c) => playerNames.includes(c.playerID));

        // Assert
       connections.forEach((c)=>{
        expect(emitMock).toHaveBeenCalledWith('turnChanged', playerNameCurrentTurn);
       })
        
        
    })
    test('handleStartGame',()=>{
        //Arrange
        const playerNames = ['123','456','789'];
        const gameId = 'game123';

        connectionList.push(...initialConnectionList);


        // Act
        handleStartGame(playerNames,gameId);

        const connections = connectionList.filter((c) => playerNames.includes(c.playerID));


       

        // Assert
        connections.forEach((c)=>{
            expect(emitMock).toHaveBeenCalledWith('startGame');
        });
        
    })
    test('handleSplash',()=>{
        //Arrange
        const playerNames = ['123','456','789'];
        const gameId = 'game123';
        const playerNameCurrentTurn = '123';
        const mockSplash = {
            hit: false,
            x: 0,
            y: 0,
            sunk: false
        }

        connectionList.push(...initialConnectionList);


        // Act
        handleSplash(playerNames,gameId,playerNameCurrentTurn,mockSplash);

        const connections = connectionList.filter((c) => playerNames.includes(c.playerID));

        // Assert
       connections.forEach((c)=>{
        expect(emitMock).toHaveBeenCalledWith('splash', playerNameCurrentTurn,mockSplash);
    });
        
    })


    test('handleGameOver',()=>{
        //Arrange
        const playerNames = ['123','456','789'];
        const gameId = 'game123';
        const winner = '123';
        const gameMock = new Game(gameId);
        
        const deleteSpy = jest.spyOn(gameMap,'delete');

        gameMap.set(gameId,gameMock);


        // Act
        handleGameOver(playerNames,gameId,winner);

        const connections = connectionList.filter((c) => playerNames.includes(c.playerID));
        
        // Assert
        connections.forEach((c)=>{      
        expect(emitMock).toHaveBeenCalledWith('gameOver', winner);
        });
        expect(deleteSpy).toHaveBeenCalledWith(gameId);
        deleteSpy.mockRestore();
        
    })

})