import React from 'react';
import {
    Card,
    CardActions,
    CardContent,
    Grid,
    Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URL } from '../../App';

//Spiel erstellen-Komponente mit Socket-IO Informationen
export const CreateGame = () => {
    const [GameFieldSize, setGameFieldSize] = React.useState('10');

    const navigate = useNavigate();

    const createNewGame = async () => {
        try {
            const response = await axios.post(SERVER_URL + '/newgame');

            if (response.data && response.data.gameId) {
                const link = '/GameField/' + response.data.gameId;
                navigate(link, { state: GameFieldSize });
            } else {
                console.log('The response does not contain a game ID.');
            }
        } catch (error) {
            console.error('An error occurred while creating the game:', error);
        }
    };

    const handleGameFieldSizeChange = (ev: any) => {
        setGameFieldSize(ev.target.value);
    };

    return (
        <>
            <Typography
                variant='h2'
                color='primary'
                style={{
                    margin: 30,
                }}
            >
                {'Spiel erstellen'}
            </Typography>

            <Grid container>
                <Grid item>
                    <Card>
                        <CardContent>
                            <FormControl>
                                <FormLabel id='radio-buttons-group-label'>
                                    {'Größe des Spielfelds:'}
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
                        </CardContent>
                        <CardActions>
                            <Button
                                variant='outlined'
                                onClick={() => navigate('/')}
                            >
                                {'Zurück'}
                            </Button>
                            <Button
                                variant='contained'
                                onClick={async () => await createNewGame()}
                            >
                                {'Starten'}
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};
