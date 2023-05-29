import { ServerSocket } from './socket';

import express, { Application } from 'express';
import http from 'http';

const app: Application = express();
const port: number = 3000;

const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

new ServerSocket(server);