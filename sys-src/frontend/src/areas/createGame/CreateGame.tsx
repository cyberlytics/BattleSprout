import React, { useContext, useRef } from 'react';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import SocketContext from '../../socket/Context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

//Spiel erstellen-Komponente mit Socket-IO Informationen

interface IApplicationProps {}

export const CreateGame: React.FunctionComponent<IApplicationProps> = (
    props
) => {
    const { socket, uid, users } = useContext(SocketContext).SocketState;

    const gamelinkRef = useRef<HTMLInputElement>(null);

    const copyGameLink = () => {
        if (gamelinkRef.current) {
            navigator.clipboard
                .writeText(gamelinkRef.current.value)
                .then(() => {
                    console.log('Game link copied successfully!');
                })
                .catch((error) => {
                    console.error('Failed to copy game link:', error);
                });
        }
    };

    const gamelink = '[Hier wird die Adresse uebergeben]';

    const navigate = useNavigate();

    const createNewGame = async () => {
        try {
            const response = await axios.post('http://localhost:3000/newgame');

            if (response.data && response.data.gameId) {
                navigate(`/GameField/${response.data.gameId}`);
            } else {
                console.log('The response does not contain a game ID.');
            }
        } catch (error) {
            console.error('An error occurred while creating the game:', error);
        }
    };

    return (
        <>
            <div>
                <Typography
                    variant='h2'
                    style={{
                        color: '#45ad45',
                        margin: 30,
                    }}
                >
                    Spiel erstellen
                </Typography>
                <div
                    style={{
                        margin: 30,
                    }}
                >
                    <Button
                        variant='outlined'
                        onClick={() => navigate('/MainMenu')}
                    >
                        {'Zurück'}
                    </Button>
                </div>
                <div
                    style={{
                        margin: 30,
                    }}
                >
                    <FormControl>
                        <FormLabel id='radio-buttons-group-label'>
                            Größe des Spielfelds:
                        </FormLabel>
                        <RadioGroup
                            aria-labelledby='radio-buttons-group-label'
                            defaultValue='ten'
                            name='radio-buttons-group'
                        >
                            <FormControlLabel
                                value='five'
                                control={<Radio />}
                                label='5x5'
                            />
                            <FormControlLabel
                                value='seven'
                                control={<Radio />}
                                label='7x7'
                            />
                            <FormControlLabel
                                value='ten'
                                control={<Radio />}
                                label='10x10'
                            />
                            <FormControlLabel
                                value='twelve'
                                control={<Radio />}
                                label='12x12'
                            />
                            <FormControlLabel
                                value='fifteen'
                                control={<Radio />}
                                label='15x15'
                            />
                        </RadioGroup>
                    </FormControl>
                </div>
                <div
                    style={{
                        margin: 30,
                    }}
                >
                    <Typography variant='body1'>
                        Lade einen Freund ein:
                    </Typography>
                    <div id='copyLinkBox'>
                        {/* Game link */}
                        <input
                            type='text'
                            ref={gamelinkRef}
                            value={gamelink}
                            readOnly
                            style={{ display: 'none' }}
                        />
                        <Typography variant='body1'>{gamelink}</Typography>
                        <Button
                            variant='contained'
                            onClick={copyGameLink}
                            style={{
                                marginTop: 30,
                                marginBottom: 30,
                            }}
                        >
                            {' '}
                            Kopieren
                        </Button>
                    </div>
                    <div
                        style={{
                            marginTop: 30,
                        }}
                    >
                        <Typography variant='body1'>
                            SocketIO Informationen:
                        </Typography>
                        <Typography variant='body2'>User ID: {uid}</Typography>
                        <Typography variant='body2'>
                            Anzahl Online-User: {users.length}
                        </Typography>
                        <Typography variant='body2'>
                            Socket ID: {socket?.id}
                        </Typography>
                    </div>
                </div>
                <div
                    style={{
                        margin: 30,
                    }}
                >
                    <Button
                        variant='contained'
                        onClick={async () => await createNewGame()}
                    >
                        Starten
                    </Button>
                    {/** Link zu Game Room */}
                </div>
            </div>
        </>
    );
};
