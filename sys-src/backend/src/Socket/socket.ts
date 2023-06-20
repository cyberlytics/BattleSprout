import { Server } from 'socket.io';
import { baseListener } from "./BaseListener";

export class ServerSocket {
    public static instance: ServerSocket;


    constructor(port : number) {
        if (ServerSocket.instance) {
            return ServerSocket.instance;
        }

        ServerSocket.instance = this;

        const io = new Server(port, {
            serveClient: false,
            pingInterval: 10000,
            pingTimeout: 5000,
            cookie: false,
            cors: {
                origin: '*'
            }
        });

        io.on('connect', baseListener);

        console.info('SocketIO started.');
    }
}