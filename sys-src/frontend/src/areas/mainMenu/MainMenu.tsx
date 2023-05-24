import {
    ButtonBase,
    Grid,
    GridProps,
    Paper,
    Typography,
    styled,
} from '@mui/material';
import { MenuTile } from './components/MenuTile';

//Hauptmenü des Spiels. Von hier aus soll der Nutzer überall hinkommen.
export const MainMenu = () => {
    const xsValue = 12;
    const mdValue = 6;
    const lgValue = 4;

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant='h2'>{'Hauptmenü'}</Typography>
            </Grid>
            <Grid item xs={xsValue} md={mdValue} lg={lgValue}>
                <MenuTile
                    title='Spiel erstellen'
                    content='Erstelle ein Spiel, dem ein anderer beitreten kann'
                    link='/createGame'
                />
            </Grid>
            <Grid item xs={xsValue} md={mdValue} lg={lgValue}>
                <MenuTile
                    title='Spiel beitreten'
                    content='Tritt einem Spiel bei'
                    link='/joinGame'
                />
            </Grid>
        </Grid>
    );
};
