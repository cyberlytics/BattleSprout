import { Grid, Typography } from '@mui/material';
import { MenuTile } from './components/MenuTile';
import {
    AddCircleOutlined,
    FormatListNumbered,
    GroupAdd,
} from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './../../assets/battlesprout.png';
import { JoinGameDialog } from './components/JoinGame';

//Hauptmenü des Spiels. Von hier aus soll der Nutzer überall hinkommen.
export const MainMenu = () => {
    const [openJoinDialog, setOpenJoinDialog] = useState(false);

    function handleOpenJoinDialog() {
        setOpenJoinDialog(true);
    }

    function handleCloseJoinDialog() {
        setOpenJoinDialog(false);
    }

    const navigate = useNavigate();

    const xsValue = 12;
    const mdValue = 6;
    const lgValue = 4;

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <img
                        src={logo}
                        alt='Battlesprout Logo'
                        style={{
                            display: 'block',
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: 'auto',
                            width: '50%',
                        }}
                    />
                    <Typography
                        variant='h5'
                        style={{
                            color: '#45ad45',
                            marginBottom: 50,
                            marginLeft: 'auto', 
                            marginRight: 'auto',
                            textAlign: 'center'
                        }}
                    >
                        {
                            'Herzlich Willkommen zu BattleSprout - der freundlicheren Variante von BattleShips'
                        }
                    </Typography>
                </Grid>
                <Grid item xs={xsValue} md={mdValue} lg={lgValue}>
                    <MenuTile
                        icon={AddCircleOutlined}
                        title='Spiel erstellen'
                        content='Erstelle ein Spiel, dem ein anderer beitreten kann'
                        action={() => navigate('/createGame')}
                    />
                </Grid>
                <Grid item xs={xsValue} md={mdValue} lg={lgValue}>
                    <MenuTile
                        icon={GroupAdd}
                        title='Spiel beitreten'
                        content='Tritt einem Spiel bei'
                        action={handleOpenJoinDialog}
                    />
                </Grid>
                <Grid item xs={xsValue} md={mdValue} lg={lgValue}>
                    <MenuTile
                        icon={FormatListNumbered}
                        title='Rangliste'
                        content='Sehe dir deine und andere Statistiken an'
                        action={() => navigate('/ranking')}
                    />
                </Grid>
            </Grid>

            <JoinGameDialog
                openJoinDialog={openJoinDialog}
                handleCloseJoinDialog={() => handleCloseJoinDialog()}
            />
        </>
    );
};
