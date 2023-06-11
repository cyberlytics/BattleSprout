import {
    AppBar,
    Box,
    Button,
    List,
    ListItem,
    Toolbar,
    Typography,
} from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';

//zum Teste  der Navigation und der Komponenten
export const Layout = () => {
    const navigate = useNavigate();

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

            <Outlet />
        </>
    );
};
