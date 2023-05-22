import { List, ListItem } from '@mui/material';
import { Outlet, Link } from 'react-router-dom';

//zum Teste  der Navigation und der Komponenten
export const Layout = () => {
    return (
        <>
            <List dense>
                <ListItem>
                    <Link to='/'>Hauptmenü</Link>
                </ListItem>
                <ListItem>
                    <Link to='/Dashboard'>Dashboard</Link>
                </ListItem>
                <ListItem>
                    <Link to='/Login'>Login</Link>
                </ListItem>
                <ListItem>
                    <Link to='/GameField'>Spielfeld</Link>
                </ListItem>
            </List>

            <Outlet />
        </>
    );
};
