import {
    Button,
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    Container,
    Fab,
    Grid,
    Paper,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import io from 'socket.io-client';
import { GridComponent } from './GridComponent';
import { PlantTile } from '../../PlantTile.';
import { PlantsAvailableListComponent } from './PlantsAvailableListComponent';
import { GameState } from './GameState';
import { SOCKET_SERVER_URL } from '../../App';
import { ContentCopy } from '@mui/icons-material';

export enum CellState {
    EMPTY,
    PLANT,

    SETUP,
    HIT,
    MISS,
}
const PlantLength = [2, 3, 3, 4];

const playerId = '1';

export const GameField = () => {
    const params = useParams();
    const gameId = params.id;

    const navigate = useNavigate();

    const [socket] = useState(io(SOCKET_SERVER_URL));
    const [gameState, setGameState] = useState<GameState>(GameState.connecting);
    const location = useLocation();

    let size = Number(location.state) || 10;


    const [plantTiles, setPlantTiles] = useState<PlantTile[]>([]);
    const [gameFieldSize, setGameFieldSize] = useState<number>(size);
    const [setupDone, setSetupDone] = useState<boolean>(false);
    const [currentPlayer, setCurrentPlayer] = useState<string>("");

    const [playerId, setPlayerId] = useState<string>("");
    const [ourBoardSplashes, setOurBoardSplashes] = useState<{ hit: boolean; x: number; y: number; sunk: boolean }[]>([]);
    const [enemyBoardSplashes, setEnemyBoardSplashes] = useState<{ hit: boolean; x: number; y: number; sunk: boolean }[]>([]);

    const [usablePlants, setUsablePlants] = useState<number[]>(PlantLength);

    const [isSocketSetup, setIsSocketSetup] = useState<boolean>(false);

    const [opponentName, setOpponentName] = useState<string>("");

    const [turn, setTurn] = useState<boolean>(false);

    useEffect(() => {
        if (!isSocketSetup) {
            socketSetup();
        }

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {}, []);

    function socketSetup() {
        setIsSocketSetup(true);

        setGameState(GameState.joining);
        socket.emit('handshake');



        let token = localStorage.getItem('token');
        socket.emit('authenticate', token);

        let user = localStorage.getItem('user');
        setPlayerId(user!);

        socket.emit('joinGame', gameId);


        registerSocketEvents(user!);

        setIsSocketSetup(true);
    }


    function registerSocketEvents(playerId: string) {

        socket.on('splash', (splashedPlayer: string, splash: { hit: boolean; x: number; y: number; sunk: boolean }) => {
                handleSplash(splashedPlayer, playerId, splash);
            }
        );
        socket.on('turnChanged', (playerNameOfNewTurn: string) => {
            setCurrentPlayer(playerNameOfNewTurn);
        });

        socket.on('gameInit', (gameFieldSize: number) => {
            setGameFieldSize(gameFieldSize);
            setGameState(GameState.setup);
        })

        socket.on('startGame', (opponentName: string) => {
            setGameState(GameState.playing);
            setOpponentName(opponentName)
        });

        socket.on('gameOver', (winner: string) => {
            handleGameOver(winner, playerId);
        });

    }


    function handleSplash(currentPlayer: string, id: string, splash: { hit: boolean; x: number; y: number; sunk: boolean }) {
        if (currentPlayer === id) {
            setEnemyBoardSplashes([...enemyBoardSplashes, splash]);
        } else {
            setOurBoardSplashes([...ourBoardSplashes, splash]);
        }
    }

    function setReady() {
        socket.emit('playerReady', gameId);
        setGameState(GameState.waiting);
    }

    function handleGameOver(winner: string, playerId: string ) {

        let endMessage = "";
        if(winner === playerId) {
            endMessage = "Du hast gewonnen!";
        }else {
            endMessage = "Du hast verloren!";
        }

        navigate("/")
        alert(endMessage);

    }

    function setPlant() {

        if (!isPlantSizeAvailable()) return;

        socket.emit('setPlant', plantTiles);
        setPlantTiles([]);
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

    function addPlantTile(plantTile: PlantTile): boolean {
        setSetupDone(false);
        if (!canPlantTileBeAdded(plantTile)) return false;

        setPlantTiles([...plantTiles, plantTile]);
        return true;
    }

    function canPlantTileBeAdded(plantTile: PlantTile): boolean {
        if (plantTiles.length >= Math.max.apply(null, usablePlants))
            return false;

        if (plantTiles.length === 0) return true;

        const isNotInStraightLine = checkForStraightLine(plantTiles, plantTile);
        const hasAdjacentTile = checkForNeighbour(plantTiles, plantTile);

        return hasAdjacentTile && isNotInStraightLine;
    }

    function checkForStraightLine(tiles: PlantTile[], targetTile: PlantTile): boolean {

        return tiles.every((tile) => {
            return (
                tile.position.x === targetTile.position.x ||
                tile.position.y === targetTile.position.y
            );
        });
    }

    function checkForNeighbour(tiles: PlantTile[], targetTile: PlantTile): boolean {

        return tiles.some((tile) => {
            const isNextInX =
                tile.position.x === targetTile.position.x + 1 ||
                tile.position.x === targetTile.position.x - 1;
            const isNextInY =
                tile.position.y === targetTile.position.y + 1 ||
                tile.position.y === targetTile.position.y - 1;
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
                if (currentPlayer === playerId) {
                    return 'Du bist am Zug - werfe deine Wasserbombe auf ein Feld deines Nachbars!';
                }
                return 'Vorsicht - dein Nachbar wirft eine Wasserbombe...';
            case GameState.finished:
                return 'Spiel zu Ende!';
            default:
                return '';
        }
    };

    const copyGameLink = () => {
        if (gameId) {
            navigator.clipboard
                .writeText(gameId)  
        }
    };

    function renderRightContent() {
        switch (gameState) {
            case GameState.confirm:
                return (
                    <Button onClick={setReady} variant='contained'
                        style={{
                            marginTop: 250
                        }}
                    >
                        {'Bereit!'}
                    </Button>
                );
            case GameState.setup:
                return (
                    <Card>
                        <CardContent>
                            <PlantsAvailableListComponent
                                numbers={usablePlants}
                            />
                        </CardContent>
                        <CardActions>
                            <Button onClick={setPlant} variant='contained'
                                style={{
                                    marginLeft: 5,
                                    marginBottom: 10
                                }}
                            >
                                {'Pflanze setzen!'}
                            </Button>
                        </CardActions>
                    </Card>
                );
            case GameState.playing:
                return (
                    <Card>
                        <CardContent>
                            <Typography variant='h4'>
                                {'Beet von ' + opponentName}
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
                        </CardContent>
                    </Card>
                );
            default:
                return <></>;
        }
    }

    function renderLeftContent() {
        switch(gameState) {
            case GameState.joining: return(<CircularProgress />);
            default: return(<>
            <Typography variant='h4'>{'Dein Beet'}</Typography>
                            
                            <GridComponent
                                gameState={gameState}
                                socket={socket}
                                setupDone={setupDone}
                                isUrTurn={currentPlayer === playerId}
                                splashList={ourBoardSplashes}
                                gameFieldSize={gameFieldSize}
                                addPlantTile={addPlantTile}
                            /></>)
        }
    }



    return (
        <>
            <Typography
                variant='h4'
                style={{
                    color: '#45ad45',
                    margin: 30,
                }}
            >
                {getGameStateText()}
            </Typography>

            <Grid container justifyContent='center' spacing={2}>
                <Grid item>
                    <Card>
                        <CardContent>
                            {renderLeftContent()}
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item>{renderRightContent()}</Grid>
            </Grid>

            <Fab
                variant='extended'
                color='secondary'
                style={{ position: 'absolute', bottom: 16, left: 16 }}
                onClick={copyGameLink}
            >
                <ContentCopy color='primary' sx={{ mr: 1 }} />
                {'Game ID kopieren'}
            </Fab>
        </>
    );
};
