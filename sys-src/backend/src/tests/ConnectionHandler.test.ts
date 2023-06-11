import { Socket } from 'socket.io';
import{handleHandshake, handleAuthenticate,handleDisconnect} from '../Socket/Handler/ConnectionHandler';
import { connectionList } from '../models/ConnectionModel';
import 'jest';


describe("Connectionhandler", () => {

    test("handleHandshake should add connection to connectionlist", () => {
      const socket: Socket = {} as Socket; // Create a mock Socket object
      const initialConnectionList = [...connectionList]; // Create a copy of the original connectionList
      const initialConnectionListLength = initialConnectionList.length; // 

    
      //call function being tested
      handleHandshake(socket);
        
      //Perform assertions
      expect(connectionList).toEqual([
        ...initialConnectionList,
        { playerID: "", connectionState: "handshake", gameID: "", socketID: socket.id },
      ]);
      expect(connectionList.length).toBe(initialConnectionListLength + 1);
    });

    test('handleAuthenticate should find correct connection in connectionlist', () => {
        const socket : Socket = {
            id: "socket123",
        } as Socket; //Create a mock Socket object
         const message = '123'; //Not necessary for now
    
        // Set up the connectionList with a known object
        const initialConnectionList = [
          { socketID: 'socket123', otherProperty: 'otherValue' },
          { socketID: 'socket456', otherProperty: 'otherValue' },
        ];
        
        // Call the function being tested
        handleAuthenticate(socket, message);
    
        // Perform assertions
        const expectedConnection = { socketID: 'socket123', otherProperty: 'otherValue' };
        const connection = initialConnectionList.find(c => c.socketID === socket.id);
        expect(connection).toEqual(expectedConnection);

      });



  });






