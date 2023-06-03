import React, { PropsWithChildren, useContext } from 'react';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import background from './../../assets/background.png';
import SocketContext from '../../socket/Context';

//Spiel erstellen-Komponente mit Socket-IO Informationen

interface IApplicationProps {}

export const CreateGame: React.FunctionComponent<IApplicationProps> = (props) => {
    const { socket, uid, users } = useContext(SocketContext).SocketState;
    return (
        <>
            <div style={{paddingTop: 50, paddingBottom: 300, paddingLeft: 100, backgroundImage: `url(${background})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center"}}>
                <Typography variant='h2'
                    style={{
                        color: "#45ad45",
                        margin: 30
                    }}
                >
                    Spiel erstellen
                </Typography>
                <div
                    style={{
                        margin: 30
                    }}
                >
                    <FormControl>
                        <FormLabel id="radio-buttons-group-label">Größe des Spielfelds:</FormLabel>
                        <RadioGroup
                            aria-labelledby="radio-buttons-group-label"
                            defaultValue="ten"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="five" control={<Radio />} label="5x5" />
                            <FormControlLabel value="seven" control={<Radio />} label="7x7" />
                            <FormControlLabel value="ten" control={<Radio />} label="10x10" />
                            <FormControlLabel value="twelve" control={<Radio />} label="12x12" />
                            <FormControlLabel value="fifteen" control={<Radio />} label="15x15" />
                        </RadioGroup>
                    </FormControl>
                </div>
                <div
                    style={{
                        margin: 30
                    }}
                >
                    <Typography variant='body1'>Lade einen Freund ein:</Typography>
                    <div id='copyLinkBox'>
                        {/** Hier stehen spaeter die SocketIO Informationen */}
                        <Typography variant='body1'>https://unserlink-gruppenraumxyz.de</Typography>
                    </div>
                    <div
                        style={{
                            marginTop: 30
                        }}
                    >
                        <Typography variant='body1'>SocketIO Informationen:</Typography>
                        <Typography variant='body2'>User ID: {uid}</Typography>
                        <Typography variant='body2'>Anzahl Online-User: {users.length}</Typography>
                        <Typography variant='body2'>Socket ID: {socket?.id}</Typography>
                    </div>
                </div>
                <div
                    style={{
                        margin: 30
                    }}
                >
                    <Button variant="contained">Starten</Button> {/** Link zu Game Room */}
                </div>
            </div>
        </>
    ); 
};
