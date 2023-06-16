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
    const gamelinkRef = useRef<HTMLInputElement>(null);
    const [GameFieldSize, setGameFieldSize] = React.useState('10');

    //TODO: Move to gameField
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
                const link = '/GameField/' + response.data.gameId;
                navigate(link, {state: GameFieldSize});
            } else {
                console.log('The response does not contain a game ID.');
            }
        } catch (error) {
            console.error('An error occurred while creating the game:', error);
        }
    };

    const handleGameFieldSizeChange = (ev: any) => {        
        setGameFieldSize(ev.target.value)        
    }

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
                            defaultValue='10'
                            name='radio-buttons-group'                            
                            onChange={handleGameFieldSizeChange}
                        >
                            <FormControlLabel
                                value='5'
                                control={<Radio />}
                                label='5x5'
                            />
                            <FormControlLabel
                                value='7'
                                control={<Radio />}
                                label='7x7'
                            />
                            <FormControlLabel
                                value='10'
                                control={<Radio />}
                                label='10x10'
                            />
                            <FormControlLabel
                                value='12'
                                control={<Radio />}
                                label='12x12'
                            />
                            <FormControlLabel
                                value='15'
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
                    {/* <Typography variant='body1'>
                        Lade einen Freund ein:
                    </Typography>
                    <div id='copyLinkBox'>
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
                    </div> */}
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
