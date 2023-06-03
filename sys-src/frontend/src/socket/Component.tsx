import React, { PropsWithChildren, useEffect, useReducer, useState } from 'react';
import { defaultSocketContextState, SocketContextProvider, SocketReducer } from './Context';
import { useSocket } from './useSocket';

export interface ISocketContextComponentProps extends PropsWithChildren {}

const SocketContextComponent: React.FunctionComponent<ISocketContextComponentProps> = (props) => {
    const { children } = props;

    const [SocketState, SocketDispatch] = useReducer(SocketReducer, defaultSocketContextState);
    const [loading, setLoading] = useState(true);

    const socket = useSocket('ws://localhost:1337', {
        reconnectionAttempts: 5,
        reconnectionDelay: 5000,
        autoConnect: false
    });

    useEffect(() => {
        /** Zum Web Socket verbinden */
        socket.connect();

        /** Socket in Context speichern */
        SocketDispatch({ type: 'update_socket', payload: socket });

        /** Event Listeners starten */
        StartListeners();

        /** Handshake senden */
        SendHandshake();

        // eslint-disable-next-line
    }, []);

    const StartListeners = () => {
        /** User connected Event */
        socket.on('user_connected', (users: string[]) => {
            console.info('User connected, new user list received.');
            SocketDispatch({ type: 'update_users', payload: users });
        });

        /** User disconnected Event */
        socket.on('user_disconnected', (uid: string[]) => {
            console.info('User disconnected');
            SocketDispatch({ type: 'remove_user', payload: uid });
        });

        /** Reconnect Event */
        socket.io.on('reconnect', (attempt) => {
            console.info('Reconnected on attempt: ' + attempt);
        });

        /** Reconnect attempt Event */
        socket.io.on('reconnect_attempt', (attempt) => {
            console.info('Reconenction attempt: ' + attempt);
        });

        /** Reconnection Error */
        socket.io.on('reconnect_error', (error) => {
            console.info('Reconenction error: ' + error);
        });

        /** Reconnection fehlgeschlagen */
        socket.io.on('reconnect_failed', () => {
            console.info('Reconenction failure');
            alert('Wir konnten Sie nicht mit dem Web-Socket verbinden.');
        });
    };

    const SendHandshake = () => {
        console.info('Sending handshake to server...');

        socket.emit('handshake', (uid: string, users: string[]) => {
            console.log('User handshake callback message received');
            SocketDispatch({ type: 'update_uid', payload: uid });
            SocketDispatch({ type: 'update_users', payload: users});

            setLoading(false);
        });
    };

    if (loading) return <p>Loading socket IO...</p>;

    return <SocketContextProvider value={{ SocketState, SocketDispatch }}>{children}</SocketContextProvider>
};

export default SocketContextComponent;
