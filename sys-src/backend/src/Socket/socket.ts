import { Server as HTTPServer } from 'http';
import { Socket, Server } from 'socket.io';
import {baseListener} from "./BaseListener";
import { v4 } from 'uuid';

/* Kümmert sich um die Verbindung und öffnet Socket-Server, beinhaltet StartListeners für Socket-Verbindung */

export class ServerSocket {
    public static instance: ServerSocket;
    public io: Server;

    public users: { [uid: string]: string };

    constructor(server: HTTPServer) {
        ServerSocket.instance = this;
        this.users= {};
        this.io = new Server(server, {
            serveClient: false,
            pingInterval: 10000,
            pingTimeout: 5000,
            cookie: false,
            cors: {
                origin: '*'
            }
        });

        this.io.on('connect', baseListener);

        console.info('SocketIO started.');
    }

}