import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

//Spiel erstellen-Komponente
export const CreateGame = () => {
    return (
        <>
            <Typography variant='h2'
                style={{
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
                    <FormLabel id="radio-buttons-group-label">Goesse des Spielfelds:</FormLabel>
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
                    <Typography variant='body1'>https://unserlink-gruppenraumxyz.de</Typography>
                </div>
            </div>
            <div
                style={{
                    margin: 30
                }}
            >
                <Button variant="contained">Starten</Button> {/** Linked to Game Room */}
            </div>
        </>
    ); 
};
