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
import background from './../../assets/background.png';
import logo from './../../assets/battlesprout.png';

//Hauptmenü des Spiels. Von hier aus soll der Nutzer überall hinkommen.
export const MainMenu = () => {
    const [openHelpDialog, setOpenHelpDialog] = useState<boolean>(false);

    const handleClickOpen = () => {
        setOpenHelpDialog(true);
    };

    const handleClose = () => {
        setOpenHelpDialog(false);
    };

    const xsValue = 12;
    const mdValue = 6;
    const lgValue = 4;

    return (
        <>
            <div style={{paddingTop: 30, paddingBottom: 300, paddingLeft: 100, paddingRight: 100, backgroundImage: `url(${background})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center"}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <img src={logo} alt="Battlesprout Logo" 
                            style={{
                                display: "block",
                                justifyContent: "center",
                                alignItems: "center",
                                margin: "auto",
                                width: "50%"
                            }}
                        />
                        <Typography variant='h4'
                            style={{
                                color: "#45ad45",
                                margin: 30
                            }}
                        >
                            {'Battleship war gestern - herzlich willkommen zu BattleSprout!'}
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

                <Tooltip title={'Hilfe'} placement='top'>
                    <Fab
                        color='secondary'
                        style={{ position: 'absolute', bottom: 16, right: 16 }}
                        onClick={handleClickOpen}
                    >
                        <Help fontSize='large' color='primary' />
                    </Fab>
                </Tooltip>

                <Dialog open={openHelpDialog} onClose={handleClose} fullWidth>
                    {/* TODO: Help Dialog */}
                    <DialogActions
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                        }}
                    >
                        <Tooltip title={'Schließen'} placement='top'>
                            <IconButton onClick={handleClose}>
                                <Close />
                            </IconButton>
                        </Tooltip>
                    </DialogActions>
                    <DialogTitle>{'Filler: Das ist der Hilfe Dialog'}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {
                                'Hier wird ein Text und Video zur Hilfe im System Eingefügt'
                            }
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
};
