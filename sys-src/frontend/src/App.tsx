import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import { NoPage } from './NoPage';
import { Ranking } from './areas/ranking/Ranking';
import { GameFIeld } from './areas/gameField/GameField';
import { Login } from './areas/login/Login';
import { MainMenu } from './areas/mainMenu/MainMenu';
import { CreateGame } from './areas/createGame/CreateGame';
import { ThemeProvider, createTheme } from '@mui/material';
import { Signup } from './areas/signup/signup';
import './App.css';

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
    if(localStorage.getItem('token') == null){
       return(
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' Component={Login}/>
                    <Route path='/signup' Component={Signup}/>              
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
        );
    }
    
    return (
        
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' Component={Layout}>
                        <Route index path='MainMenu' Component={MainMenu} />
                        <Route path='Dashboard' Component={Dashboard} />
                        <Route index path='Login' Component={Login} />
                        <Route path='Signup' Component={Signup}/>
                        <Route path='GameField' Component={GameFIeld} />
                        <Route path='CreateGame' Component={CreateGame} />
                        <Route path='Ranking' Component={Ranking} />
                        <Route path='*' Component={NoPage} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
};
