import { Server as HTTPServer } from 'http';
import { Socket, Server } from 'socket.io';
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

        this.io.on('connect', this.StartListeners);

        console.info('SocketIO started.');
    }

    StartListeners = (socket: Socket) => {
        console.info('Message received from ' + socket.id);

        socket.on('handshake', (callback: (uid: string, users: string[]) => void) => {
            console.info('Handshake received from ' + socket.id);

            /** Prüfen, ob es sich um eine Reconnection handelt */
            const reconnected = Object.values(this.users).includes(socket.id);

            if (reconnected)
            {
                console.info('This user has reconnected.');
                const uid = this.GetUidFromSocketId(socket.id);
                const users = Object.values(this.users);

                if (uid) {
                    console.info('Sending callback for reconnect...');
                    callback(uid, users);
                    return;
                }
            }

            /** Neuen User generieren */
            const uid = v4();
            this.users[uid] = socket.id;
            const users = Object.values(this.users);

            console.info('Sending callback for handshake...');
            callback(uid, users);

            /** Neuen User zu verbundenen Usern senden */
            this.SendMessage(
                'user_connected',
                users.filter((id) => id !== socket.id),
                users
            );
        });

        socket.on('disconnect', () => {
            console.info('Disconnect received from ' + socket.id);

            const uid = this.GetUidFromSocketId(socket.id);

            if (uid) {
                delete this.users[uid];
                const users = Object.values(this.users);
                this.SendMessage('user_disconnected', users, uid);
            }
        });
    };

    GetUidFromSocketId = (id: string) => Object.keys(this.users).find(uid => this.users[uid] === id);

    /**
     * Message per Socket senden
     * @param name Der Name des Events, z. B. handshake
     * @param users Liste von Socket IDs
     * @param payload Informationen die der User braucht um State zu updaten
     */
    SendMessage = (name: string, users: string[], payload?: Object) => {
        console.info('Emmitting event: ' + name + ' to ', users);
        users.forEach((id) => (payload ? this.io.to(id).emit(name, payload) : this.io.to(id).emit(name)));
    }
}