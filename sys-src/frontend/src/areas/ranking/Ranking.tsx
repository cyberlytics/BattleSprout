import { useState } from 'react';
import {
    Grid,
    Typography,
    Divider,
    List,
    ListItem,
    ListItemText,
    Button
} from '@mui/material';

interface IRank {
    Name: string;
    Points: number;
}

//ToDo: Richtige Namen/ScorePoint Werte übergeben

//Rangliste
export const Ranking = () => {
    const [ranklist, setRanklist] = useState<IRank[]>([]);

    //test-button um Liste zu füllen
    const Add = (event: any): void => {
        const newScore = {Name: 'Max',Points: 13};
        setRanklist([...ranklist,newScore]);
    }

    return (
        <>
            <Grid
                container
                spacing={1}
                direction={'column'}
                style={{
                    margin: 1,
                    alignItems: 'center',
                    display: 'flex'
                }}
            >
                <Typography 
                    variant='h3'
                    sx={{marginLeft: 3}}
                >
                    Rangliste!
                </Typography>
                <Button onClick={Add}> 
                    CLICK
                </Button>
            </Grid>
            <Divider sx={{margin: 5}}/>
            <Grid>
                <List sx={{ width: '100%', background: '#bbd8b1'}}>
                    {ranklist.map((value) => (
                        <ListItem
                            key={value.Name}
                            disableGutters
                            sx={{padding: 2}}
                        >
                            <ListItemText primary={`Name: ${value.Name} Punkte: ${value.Points}`} />
                        </ListItem>
                    ))}
                </List>
            </Grid>
        </>
    );
};
