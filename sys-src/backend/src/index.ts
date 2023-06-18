import { ServerSocket } from './Socket/socket';

const { User } = require("./models/user");
const loginRoute = require("./routes/loginRoute")
const signUpRoute = require("./routes/signUpRoute")
const friendRoute = require("./routes/friendRoute")
const rankRoute = require("./routes/rankRoute")

import express, { Application } from 'express';
import http from 'http';
import cors from 'cors';
import { Server as SocketIOServer } from 'socket.io';
import gameRoutes from "./routes/gameRoutes";
import { getAllFriends } from './controllers/friendsController';


const port: number = 3000;
const socketPort: number = 4000;

const app: Application = express();
app.use(cors());
app.use(express.json())

app.get('/', function(req, res){
    console.log("Root Route")
    res.json({ message: "hello world" });
});

app.use(friendRoute);
app.use(rankRoute);
app.use(loginRoute)
app.use(signUpRoute)
app.use(gameRoutes)


const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Set up the Socket.io server separately
new ServerSocket(socketPort);

console.log(`SocketIO running on port ${socketPort}`);


export default app;