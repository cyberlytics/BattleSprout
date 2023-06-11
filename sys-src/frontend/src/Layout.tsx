import { Close, Help } from '@mui/icons-material';
import {
    AppBar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab,
    IconButton,
    Toolbar,
    Tooltip,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

//zum Teste  der Navigation und der Komponenten
export const Layout = () => {
    const navigate = useNavigate();

    const [openHelpDialog, setOpenHelpDialog] = useState<boolean>(false);

    const handleClickOpen = () => {
        setOpenHelpDialog(true);
    };

    const handleClose = () => {
        setOpenHelpDialog(false);
    };

    return (
        <>
            <AppBar color='primary'>
                <Toolbar>
                    <Typography
                        variant='h6'
                        component='div'
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', sm: 'block' },
                        }}
                    >
                        BattleSprout
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Button
                            onClick={() => navigate('/')}
                            style={{ color: 'white' }}
                        >
                            Hauptmenü
                        </Button>
                        <Button
                            onClick={() => navigate('/Dashboard')}
                            style={{ color: 'white' }}
                        >
                            Dashboard
                        </Button>
                        <Button
                            onClick={() => navigate('/Login')}
                            style={{ color: 'white' }}
                        >
                            Login
                        </Button>
                        <Button
                            onClick={() => navigate('/GameField')}
                            style={{ color: 'white' }}
                        >
                            Spielfeld
                        </Button>
                        <Button
                            onClick={() => navigate('/CreateGame')}
                            style={{ color: 'white' }}
                        >
                            Spiel erstellen
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Toolbar />
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
            <Tooltip title={'Hilfe'} placement='top'>
                <Fab
                    color='secondary'
                    style={{ position: 'absolute', bottom: 16, right: 16 }}
                    onClick={handleClickOpen}
                >
                    <Help fontSize='large' color='primary' />
                </Fab>
            </Tooltip>

            <Outlet />
        </>
    );
};
