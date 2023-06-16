import { Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import io, { Socket } from 'socket.io-client';
import { GridComponent } from './GridComponent';

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
    const location = useLocation();
    console.log(location.state)
    //TODO: Größe vom Socket auslesen
    const [gameFieldSize, setGameFieldSize] = useState<number>(location.state);

    useEffect(() => {
        if (gameState === GameState.connecting) {
            socketContext.current.emit('handshake');
            setGameState(GameState.joining);
        }

        if (gameState === GameState.joining) {
            socketContext.current.emit('joinGame', gameId);
            setGameState(GameState.setup);
        }

        //TODO: Event for gameFieldSize
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
                        <GridComponent
                            socketContext={socketContext}
                            gameFieldSize={gameFieldSize}
                        />
                    </div>

                    <div>
                        <Typography variant='h4'>
                            Beet von Unknown_User
                        </Typography>
                        <GridComponent
                            socketContext={socketContext}
                            gameFieldSize={gameFieldSize}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
