import { useState, useEffect } from 'react';
import {
    Grid,
    Typography,
    Divider,
    List,
    ListItem,
    ListItemText,
    Button
} from '@mui/material';
import axios from 'axios';

interface IRank {
    Name: string;
    Points: number;
    Position: number;
}

//Rangliste
export const Ranking = () => {
    const [ranklist, setRanklist] = useState<IRank[]>([]);

    //ToDo: Richtige Namen/ScorePoint Werte übergeben

    const fetchRanklist = async () => {
        try {
        const response = await axios.get('http://localhost:3000/api/ranks');
        const data = response.data;

        const sortedRanklist = [...data].sort((a: IRank, b: IRank) => b.Points - a.Points);

        const updatedRanklist = sortedRanklist.map((item: IRank, index: number) => ({
            Name: item.Name,
            Points: item.Points,
            Position: index + 1,
        }));
        setRanklist(updatedRanklist);
        }
        catch (error) 
        {
        console.error('Fehler beim Abrufen der Rangliste: ', error);
        }
    };

    useEffect(() => {
        fetchRanklist();
    }, []);

    //const Add = async (): Promise<void> => {
    //Wenn die Liste voll ist wird geprüft, wird der letztplazierter entfernt und der Highscore des neuen Users wird eingetragen
    //  const newRank: IRank = { Name: Username, Points: score, Position: 0 };

    //  setRanklist((prevRanklist) => {
    //    const updatedRanklist = [...prevRanklist, newRank];

    //    updatedRanklist.sort((a, b) => b.Points - a.Points);

    //    updatedRanklist.forEach((item, index) => {
    //      item.Position = index + 1;
    //    });

    //    if (updatedRanklist.length > MAX_Length) {
    //      updatedRanklist.splice(MAX_Length);
    //    }

    //    return updatedRanklist;
    //  });
    //};

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
                    data-testid='Titel'
                    variant='h3'
                    sx={{marginLeft: 3}}
                >
                    Die Top 10 Spieler!
                </Typography>
                <Button onClick={fetchRanklist}> 
                    CLICK
                </Button>
            </Grid>

            <Divider sx={{margin: 5}}/>

            <List 
                data-testid='Ranklist' 
                sx={{ background: 'rgba(52,52,52,0.2)'}}
            >
                {ranklist.map((value) => (
                    <ListItem
                        key={value.Points}
                        sx={{padding: 1}}
                    >
                        <ListItemText primary={`PLATZ: ${value.Position} Name: ${value.Name}`} secondary={`Punkte: ${value.Points}`} />
                    </ListItem>
                ))}
            </List>
        </>
    );
};
