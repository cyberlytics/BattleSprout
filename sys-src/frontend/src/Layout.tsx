import { Help } from '@mui/icons-material';
import { AppBar, Box, Button, Fab, Toolbar, Tooltip } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './assets/battlesprout.png';
import { FriendList } from './areas/friendList/FriendList';
import { HelpDialog } from './areas/helpDialog/HelpDialog';

//zum Testen der Navigation und der Komponenten
export const Layout = () => {
    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem('token');
        navigate('Login');
        window.location.reload();
    }

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
                    <FriendList />
                    <Box
                        component='div'
                        sx={{
                            flexGrow: 1,
                            display: 'block',
                        }}
                    >
                        <img
                            src={logo}
                            alt='Battlesprout Logo'
                            style={{
                                height: 64,
                                cursor: 'pointer',
                            }}
                            onClick={() => navigate('/')}
                        />
                    </Box>

                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Button onClick={logout} style={{ color: 'white' }}>
                            Abmelden
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Toolbar />
            <HelpDialog
                openDialog={openHelpDialog}
                handleCloseDialog={() => handleClose()}
            />
            <Tooltip title={'Hilfe'} placement='top'>
                <Fab
                    color='secondary'
                    style={{ position: 'absolute', bottom: 16, right: 16 }}
                    onClick={handleClickOpen}
                >
                    <Help fontSize='large' color='primary' />
                </Fab>
            </Tooltip>
        </>
    );
};
