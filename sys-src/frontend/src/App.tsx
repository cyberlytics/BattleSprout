import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import { NoPage } from './NoPage';
import { Dashboard } from './areas/dashboard/Dashboard';
import { GameFIeld } from './areas/gameField/GameField';
import { Login } from './areas/login/Login';
import { MainMenu } from './areas/mainMenu/MainMenu';

//Oberste Komponente des Projekts, ist für die Navigation per URL zuständig
//App Komponente ist immer geladen
export const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' Component={Layout}>
                    <Route index Component={MainMenu} />
                    <Route path='Dashboard' Component={Dashboard} />
                    <Route path='Login' Component={Login} />
                    <Route path='GameField' Component={GameFIeld} />
                    <Route path='*' Component={NoPage} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
