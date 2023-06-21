import { Socket } from 'socket.io';
import {
  handleHandshake,
  handleAuthenticate,
  handleDisconnect,
} from '../Socket/Handler/ConnectionHandler';
import { connectionList, IConnectionState } from '../models/ConnectionModel';

describe('Connectionhandler', () => {
  beforeEach(() => {
    // Reset the connectionList before each test
    connectionList.length = 0;
  });

  test('handleHandshake should add connection to connectionlist', () => {
    const socket: Socket = {} as Socket; // Create a mock Socket object
    const initialConnectionList: IConnectionState[] = [...connectionList]; // Create a copy of the original connectionList
    const initialConnectionListLength = initialConnectionList.length;

    // Call the function being tested
    handleHandshake(socket);

    // Perform assertions
    expect(connectionList).toEqual([
      ...initialConnectionList,
      { playerID: '', connectionState: 'handshake', gameID: '', socket: socket },
    ]);
    expect(connectionList.length).toBe(initialConnectionListLength + 1);
  });



  test('handleAuthenticate should find correct connection in connectionlist', () => {
    const socket1: Socket = {
      id: 'socket123',
    } as Socket; 
    const socket2: Socket = {
      id: 'socket456',
    } as Socket; 
    const playerId = '123';
    // Set up the connectionList with a known object
    const initialConnectionList: IConnectionState[] = [
      { playerID: '123', connectionState: 'authenticate', gameID: '', socket: socket1},
      { playerID: '456', connectionState: 'authenticate', gameID: '', socket: socket2 },
    ];
    connectionList.push(...initialConnectionList);
    const playerID = "789";

    // Call the function being tested
    handleAuthenticate(socket1, playerId);

    // Assert
    expect(initialConnectionList[0].playerID).toEqual(playerID);
    expect(initialConnectionList[1].playerID).toBe("456");
  });



  test('handleDisconnect should remove connection from connectionlist', () => {
    const socket1: Socket = {
      id: 'socket123',
    } as Socket; 
    const socket2: Socket = {
      id: 'socket456',
    } as Socket; 

    // Set up the connectionList with a known object
    const initialConnectionList: IConnectionState[] = [
      { playerID: '123', connectionState: '', gameID: '', socket: socket1},
      { playerID: '456', connectionState: '', gameID: '', socket: socket2},
    ];
    const expectedConnectionListLength = 1;

    // Call the function being tested
    handleDisconnect(socket1);

    // Perform assertions
    //TODO:handleDisconnect doesn't do anything. Ask about it
  });
});