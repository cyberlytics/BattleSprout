import { Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import Grid from './GridComponent';
import SocketContextComponent from '../../socket/Component';
import { useParams } from 'react-router-dom';
import io, { Socket } from 'socket.io-client';

export enum CellState {
    EMPTY,
    PLANT,
    HIT,
    MISS,
}

const SOCKET_SERVER_URL = 'http://localhost:4000';

export enum GameState {
    connecting,
    joining,
    setup,
}

export const GameField: React.FC = () => {
    const params = useParams();
    const gameId = params.id;

    const socketContext = useRef<Socket>(io(SOCKET_SERVER_URL));
    const [gameState, setGameState] = useState<GameState>(GameState.connecting);

    useEffect(() => {
        if (gameState === GameState.connecting) {
            socketContext.current.emit('handshake');
            setGameState(GameState.joining);
        }

        if (gameState === GameState.joining) {
            socketContext.current.emit('joinGame', gameId);
            setGameState(GameState.setup);
        }
    }, []);

    return (
        <div>
            <Typography
                variant='h2'
                style={{
                    color: '#45ad45',
                    margin: 30,
                }}
            >
                Spielfeld
            </Typography>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '80vh',
                }}
            >
                <div style={{ display: 'flex', gap: '128px' }}>
                    <div>
                        <Typography variant='h4'>Dein Beet</Typography>
                        <Grid />
                    </div>

                    <div>
                        <Typography variant='h4'>
                            Beet von Unknown_User
                        </Typography>
                        <Grid />
                    </div>
                </div>
            </div>
        </div>
    );
};
