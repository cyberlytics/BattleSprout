import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import { NoPage } from './NoPage';
import { Ranking } from './areas/ranking/Ranking';
import { GameField } from './areas/gameField/GameField';
import { Login } from './areas/login/Login';
import { MainMenu } from './areas/mainMenu/MainMenu';
import { CreateGame } from './areas/createGame/CreateGame';
import { ThemeProvider, createTheme } from '@mui/material';
import { Signup } from './areas/signup/signup';
import './App.css';

//URLs for API, defaults to localhost if none is set in ".env"
export const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3000';
export const SOCKET_SERVER_URL =
    process.env.SOCKET_SERVER_URL || 'http://localhost:4000';

//colors to use in the project with material ui
const theme = createTheme({
    palette: {
        primary: {
            main: '#45ad45',
        },
        secondary: {
            main: '#692813',
        },
    },
});

//Oberste Komponente des Projekts, ist für die Navigation per URL zuständig
//App Komponente ist immer geladen
export const App = () => {
    //TODO: fix token

    if (localStorage.getItem('token') == null) {
        return (
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Routes>
                        <Route path='Login' Component={Login} />
                        <Route path='Signup' Component={Signup} />
                        <Route path='*' Component={Login} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Layout />
                <Routes>
                    <Route path='/' Component={MainMenu} />
                    <Route path='Signup' Component={Signup} />
                    <Route path='GameField/:id' Component={GameField} />
                    <Route path='CreateGame' Component={CreateGame} />
                    <Route path='Ranking' Component={Ranking} />
                    <Route path='*' Component={NoPage} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
};
