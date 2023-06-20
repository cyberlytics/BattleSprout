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

//Rangliste
export const Ranking = () => {
    const [ranklist, setRanklist] = useState<IRank[]>([]);
    //Maximale Listenlänge
    const MAX_Length = 10;

    //ToDo: Richtige Namen/ScorePoint Werte übergeben
    const score = Math.random();
    const Username = 'Max Mustermann';

    //test-button um Liste zu füllen
    const Add = (event: any): void => {
        //Wenn die Liste voll ist wird geprüft, ob der neue Score-Wert höher als der letztplazierte Score ist
        //Wenn ja -> letztplazierter wird entfernt und der Highscore des neuen Users wird eingetragen
        if(ranklist.length === MAX_Length){
            var lowest = Number.POSITIVE_INFINITY;
            var tmp;
            for (var i=ranklist.length-1; i>=0; i--){
                tmp = ranklist[i].Points;
                if(tmp<lowest)lowest = tmp;
            }
            if(score>lowest){
                ranklist.pop();
                const newScore = {Name: Username ,Points: score};
                setRanklist([...ranklist,newScore]);
            }
        }else{
            //Neuer Listen-Eintrag
            const newScore = {Name: Username,Points: score};
            setRanklist([...ranklist,newScore]);
        }
    }

    //Vergleicht ScorePoints und sortiert die Liste
    ranklist.sort((a: {Points: number},b: {Points: number}) =>{
        return compareScore(a,b);
    });

    //Score vergleich Funktion
    function compareScore(a: {Points: number},b: {Points: number}): number {
        return(a.Points > b.Points ? -1 : 1);
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
                    data-testid='Titel'
                    variant='h3'
                    sx={{marginLeft: 3}}
                >
                    Die Top 10 Spieler!
                </Typography>
                <Button onClick={Add}> 
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
                        key={value.Name}
                        sx={{padding: 1}}
                    >
                        <ListItemText primary={`Name: ${value.Name}`} secondary={`Punkte: ${value.Points}`} />
                    </ListItem>
                ))}
            </List>
        </>
    );
};
