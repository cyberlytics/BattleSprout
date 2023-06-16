import { Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import io, { Socket } from 'socket.io-client';
import { GridComponent } from './GridComponent';
import {PlantTile} from "../../PlantTile.";

export enum CellState {
    EMPTY,
    PLANT,

    SETUP,
    HIT,
    MISS,
}

const SOCKET_SERVER_URL = 'http://localhost:4000';

 enum GameState {
    connecting,
    joining,
    setup,

    playing
}

export const GameField= () => {
    const params = useParams();
    const gameId = params.id;

    console.log(gameId)

    const socketContext = useRef<Socket>(io(SOCKET_SERVER_URL));
    const [gameState, setGameState] = useState<GameState>(GameState.connecting);
    const location = useLocation();
    console.log(location.state)
    const [plantTiles, setPlantTiles] = useState<PlantTile[]>([]);
    const [gameFieldSize, setGameFieldSize] = useState<number>(location.state);

    useEffect(() => {
        if (gameState === GameState.connecting) {
            socketContext.current.emit('handshake');

            setGameState(GameState.joining);
            console.log('handshake')
        }

        if (gameState === GameState.joining) {
            socketContext.current.emit('joinGame', gameId);
            console.log('joining')
            setGameState(GameState.setup);
        }

        //TODO: Event for gameFieldSize
    }, );


    function setPlant() {

        setPlantTiles([]);
        socketContext.current.emit('setPlant', plantTiles);
    }

    function addPlantTile(plantTile : PlantTile) : boolean{

        if(!canPlantTileBeAdded(plantTile))
            return false;

        setPlantTiles([...plantTiles, plantTile]);
        return true;
    }

    function canPlantTileBeAdded(plantTile: PlantTile): boolean {
        if(plantTiles.length === 0){
            return true;
        }

        const isNotInStraightLine = checkForStraightLine(plantTiles, plantTile);
        const hasAdjacentTile = checkForNeighbour(plantTiles, plantTile);

        return hasAdjacentTile && isNotInStraightLine;
    }

    function checkForStraightLine(tiles: PlantTile[], targetTile: PlantTile): boolean {
        return tiles.every(tile => {
            return tile.position.x === targetTile.position.x
                || tile.position.y === targetTile.position.y;
        });
    }

    function checkForNeighbour(tiles: PlantTile[], targetTile: PlantTile): boolean {
        return tiles.some(tile => {
            const isNextInX = tile.position.x === targetTile.position.x + 1
                || tile.position.x === targetTile.position.x - 1;
            const isNextInY = tile.position.y === targetTile.position.y + 1
                || tile.position.y === targetTile.position.y - 1;
            return isNextInX || isNextInY;
        });
    }

    return (
        <div>
            {gameState === GameState.setup &&

                <button > Bereit! </button>
            }

            {gameState === GameState.setup &&
                <button onClick={setPlant}> Pflanze setzen! </button>
            }
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
                            addPlantTile={addPlantTile}

                        />
                    </div>
                    {gameState === GameState.playing &&
                        <div>
                            <Typography variant='h4'>
                                Beet von Unknown_User
                            </Typography>
                            <GridComponent
                                socketContext={socketContext}
                                gameFieldSize={gameFieldSize}
                                addPlantTile={addPlantTile}
                            />
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};
