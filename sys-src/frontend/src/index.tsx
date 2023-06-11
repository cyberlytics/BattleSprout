import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import SocketContextComponent from './socket/Component';

//index der App, bitte nichts daran ändern.
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <SocketContextComponent>
            <App />
        </SocketContextComponent>
    </React.StrictMode>
);
