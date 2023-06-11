import {
    Fab,
    Grid,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Tooltip,
} from '@mui/material';
import { MenuTile } from './components/MenuTile';
import {
    AddCircleOutlined,
    Close,
    FormatListNumbered,
    GroupAdd,
    Help,
} from '@mui/icons-material';
import { useState } from 'react';

//Hauptmenü des Spiels. Von hier aus soll der Nutzer überall hinkommen.
export const MainMenu = () => {
    const xsValue = 12;
    const mdValue = 6;
    const lgValue = 4;

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h3'>
                        {'Herzlich willkommen zu BattleSprout!'}
                    </Typography>
                </Grid>
                <Grid item xs={xsValue} md={mdValue} lg={lgValue}>
                    <MenuTile
                        icon={AddCircleOutlined}
                        title='Spiel erstellen'
                        content='Erstelle ein Spiel, dem ein anderer beitreten kann'
                        link='/createGame'
                    />
                </Grid>
                <Grid item xs={xsValue} md={mdValue} lg={lgValue}>
                    <MenuTile
                        icon={GroupAdd}
                        title='Spiel beitreten'
                        content='Tritt einem Spiel bei'
                        link='/joinGame'
                    />
                </Grid>
                <Grid item xs={xsValue} md={mdValue} lg={lgValue}>
                    <MenuTile
                        icon={FormatListNumbered}
                        title='Rangliste'
                        content='Sehe dir deine und andere Statistiken an'
                        link='/leaderBoard'
                    />
                </Grid>
            </Grid>
        </>
    );
};
