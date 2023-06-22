import { Socket } from 'socket.io';
import {
  handleHandshake,
  handleAuthenticate,
  handleDisconnect,
} from '../Socket/Handler/ConnectionHandler';
import { connectionList, IConnectionState } from '../models/ConnectionModel';

describe('Connectionhandler', () => {
  beforeEach(() => {
    connectionList.length = 0;
  });

  test('handleHandshake should add connection to connectionlist', () => {
    // Arrange
    const socket1: Socket = {
      id: 'socket123',
    } as Socket;
    const initialConnectionList: IConnectionState[] = [...connectionList]; // Create a copy of the original connectionList
    const connectionListLength = connectionList.length;

    // Act
    handleHandshake(socket1);

    // Assert
    expect(connectionList).toEqual([
      ...initialConnectionList,
      { playerID: '', connectionState: 'handshake', gameID: '', socket: socket1 },
    ]);
    expect(connectionList.length).toBe(connectionListLength + 1);
  });



  test('handleAuthenticate should find correct connection in connectionlist', () => {
    // Arrange
    const socket1: Socket = {
      id: 'socket123',
    } as Socket; 
    const socket2: Socket = {
      id: 'socket456',
    } as Socket; 
    const initialConnectionList: IConnectionState[] = [
      { playerID: '123', connectionState: 'authenticate', gameID: '', socket: socket1},
      { playerID: '456', connectionState: 'authenticate', gameID: '', socket: socket2 },
    ];
    connectionList.push(...initialConnectionList);
    const playerID = "789";

    // Act
    handleAuthenticate(socket1, playerID);

    // Find the updated connection in the connectionList
     const expectedConnection = connectionList.find(c=> c.socket.id == socket1.id);

    // Assert
    expect(expectedConnection?.playerID).toEqual(playerID);
  });



  test('handleDisconnect should remove connection from connectionlist', () => {
    // Arrange
    const socket1: Socket = {
      id: 'socket123',
    } as Socket; 
    const socket2: Socket = {
      id: 'socket456',
    } as Socket; 
    const initialConnectionList: IConnectionState[] = [
      { playerID: '123', connectionState: '', gameID: '', socket: socket1},
      { playerID: '456', connectionState: '', gameID: '', socket: socket2},
    ];
    const expectedConnectionListLength = 1;

    // Act
    handleDisconnect(socket1);

    // Assert
    //TODO:handleDisconnect doesn't do anything. Ask about it
  });
});