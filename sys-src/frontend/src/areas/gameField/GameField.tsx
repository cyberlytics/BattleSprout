import { Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import io, { Socket } from 'socket.io-client';
import { GridComponent } from './GridComponent';
import {PlantTile} from "../../PlantTile.";
import PlantsAvailableListComponent from "./PlantsAvailableListComponent";
import {GameState} from "./GameState";

export enum CellState {
    EMPTY,
    PLANT,

    SETUP,
    HIT,
    MISS,
}

const SOCKET_SERVER_URL = 'http://localhost:4000';



const PlantLength = [2, 3, 3, 4];

 const playerId = "1";

export const GameField= () => {
    const params = useParams();
    const gameId = params.id;


    console.log(gameId)

    const [socket] = useState(io(SOCKET_SERVER_URL));
    const [gameState, setGameState] = useState<GameState>(GameState.connecting);
    const location = useLocation();
    console.log(location.state)
    const [plantTiles, setPlantTiles] = useState<PlantTile[]>([]);
    const [gameFieldSize, setGameFieldSize] = useState<number>(10);
    const [setupDone, setSetupDone] = useState<boolean>(false);
    const [currentPlayer, setCurrentPlayer] = useState<string>("");

    const [playerId, setPlayerId] = useState<string>("");
    const [ourBoardSplashes, setOurBoardSplashes] = useState<{ hit: boolean; x: number; y: number; sunk: boolean }[]>([]);
    const [enemyBoardSplashes, setEnemyBoardSplashes] = useState<{ hit: boolean; x: number; y: number; sunk: boolean }[]>([]);

    const [usablePlants, setUsablePlants] = useState<number[]>(PlantLength);

    const [isSocketSetup, setIsSocketSetup] = useState<boolean>(false);

    const [turn, setTurn] = useState<boolean>(false);


    useEffect(() => {

        if (!isSocketSetup) {
            socketSetup();
        }

        return () => {

            socket.disconnect();

        };

    },[] );


    useEffect(() => {



    },[] );

    function socketSetup() {


        setIsSocketSetup(true);


        setGameState(GameState.joining);
        socket.emit('handshake')

        console.log('handshake')
        const id = Math.random().toString(36);
        console.log("PlayerID "+  id)
        socket.emit('authenticate', id);
        setPlayerId(id);

        socket.emit('joinGame', gameId);

        setGameState(GameState.setup);


        setPlayerId(id);

        socket.on('splash', (splashedPlayer: string, splash: { hit: boolean; x: number; y: number; sunk: boolean }) => {

            handleSplash(splashedPlayer, id,  splash);

        });



        socket.on('turnChanged', (playerNameOfNewTurn: string) => {

            console.log("Received TurnChanged : " + playerNameOfNewTurn)
            setCurrentPlayer(playerNameOfNewTurn);
        });

        socket.on('startGame', () => {

            console.log("Received Startgame")
            setGameState(GameState.playing);
        });

        setIsSocketSetup(true);

    }


    function handleSplash(currentPlayer: string, id:string ,splash: { hit: boolean; x: number; y: number; sunk: boolean }) {


        if(currentPlayer === id){
            setEnemyBoardSplashes([...enemyBoardSplashes, splash]);

        }else{

            setOurBoardSplashes([...ourBoardSplashes, splash]);
        }
    }

    function setReady() {

        socket.emit('playerReady', gameId);
        setGameState(GameState.waiting);
    }


    function setPlant() {


        if (!isPlantSizeAvailable())
            return;

        setPlantTiles([]);

        const dataObjects = plantTiles.map((plantTile) => ({
            position: {
                x: plantTile.position.x,
                y: plantTile.position.y,
            }
        }));

        console.log(dataObjects);
        socket.emit('setPlant', dataObjects);
        setSetupDone(true);
    }

    function isPlantSizeAvailable(): boolean {
        const plantLength = plantTiles.length;

        if (usablePlants.includes(plantLength)) {

            let updated = [...usablePlants];

            updated.splice(updated.indexOf(plantLength), 1);

            setUsablePlants(updated);

            if (updated.length === 0) {
                setGameState(GameState.confirm);
            }
            return true;
        }
        return false;
    }

    function addPlantTile(plantTile : PlantTile) : boolean{

        setSetupDone(false);
        if(!canPlantTileBeAdded(plantTile))
            return false;

        setPlantTiles([...plantTiles, plantTile]);
        return true;
    }

    function canPlantTileBeAdded(plantTile: PlantTile): boolean {

        if(plantTiles.length >= Math.max.apply(null, usablePlants))
            return false;

        if(plantTiles.length === 0)
            return true;

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

    const getGameStateText = () => {
        switch (gameState) {
            case GameState.connecting:
                return 'Verbinden...';
            case GameState.joining:
                return 'Spiel beitreten...';
            case GameState.setup:
                return 'Spielaufbau - platziere deine Pflanzen';
            case GameState.waiting:
                return 'Warten auf Gegner...';
            case GameState.playing:
                if(currentPlayer === playerId){
                    return 'Du bist am Zug!';
                }
                return 'Warten auf den Gegnerzug...';
            case GameState.finished:
                return 'Spiel zu Ende!';
            default:
                return '';
        }
    };

    return (
        <div>



            <Typography
                variant='h2'
                style={{
                    color: '#45ad45',
                    margin: 30,
                }}
            >
                {getGameStateText()}
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
                            gameState={gameState}
                            socket={socket}
                            setupDone={setupDone}
                            isUrTurn={currentPlayer === playerId}
                            splashList={ourBoardSplashes}
                            gameFieldSize={gameFieldSize}
                            addPlantTile={addPlantTile}
                        />
                    </div>

                    {gameState === GameState.confirm &&
                        <button onClick={setReady}> Bereit! </button>
                    }

                    { gameState===GameState.setup
                        && <PlantsAvailableListComponent numbers={usablePlants} /> }

                    {gameState === GameState.setup &&
                        <button onClick={setPlant}> Pflanze setzen! </button>
                    }
                    {gameState === GameState.playing &&
                        <div>
                            <Typography variant='h4'>
                                Beet von Unknown_User
                            </Typography>
                            <GridComponent
                                gameState={gameState}
                                isUrTurn={currentPlayer === playerId}
                                socket={socket}
                                setupDone={setupDone}
                                splashList={enemyBoardSplashes}
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
