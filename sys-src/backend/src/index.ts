import { ServerSocket } from './socket';
var cors = require('cors');
const { User } = require("./models/user");
const loginRoute = require("./routes/loginRoute")
const signUpRoute = require("./routes/signUpRoute")
import express, { Application } from 'express';
import http from 'http';

const app: Application = express();
const port: number = 3000;

app.use(cors())
app.use(express.json())

app.get('/', function(req, res){
  console.log("Root Route")
  res.json({ message: "hello world" });
});

app.use(loginRoute)
app.use(signUpRoute)

const server = http.createServer(app);
server.listen(port, () => {
    
    console.log(`Server running on port ${port}`);
});

export default app;

new ServerSocket(server);