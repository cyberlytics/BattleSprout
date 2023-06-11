import { Socket } from 'socket.io';
import{handleHandshake, handleAuthenticate,handleDisconnect} from '../src/Socket/Handler/ConnectionHandler';
import { connectionList } from '../src/models/ConnectionModel';
import 'jest';


describe("handleHandshake", () => {
    it("should push a new connection to the connectionList", () => {
      const socket: Socket = {} as Socket; // Create a mock Socket object
      const initialConnectionList = [...connectionList]; // Create a copy of the original connectionList
  
      handleHandshake(socket);
  
      expect(connectionList).toEqual([
        ...initialConnectionList,
        { playerID: "", connectionState: "handshake", gameID: "", socketID: socket.id },
      ]);
    });
  });







