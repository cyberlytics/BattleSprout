import { ServerSocket } from './socket';
var cors = require('cors');
const { User } = require("./models/user");

import express, { Application } from 'express';
import http from 'http';
import {connect, InsertOne, FindOne} from './db'


const app: Application = express();
const port: number = 3000;

app.use(cors())

app.get('/', function(req, res){
  console.log("Root Route")
  res.json({ message: "hello world" });
});

//login
app.post("/api/auth", async function(req, res){
  connect();
  console.log(req)
  const user = await FindOne("Battlesprout", "user", req.body.email)
  if(!user)
    return res.status(401).send({message: "Invalid Email or Password"});
  
    if(req.body.password != user.password)
      return res.status(401).send({message: "Wrong Password"});

  const token = user.generateAuthToken();
  res.status(200).send({data: token, message: "You are now logged in"});
});


//new user TODO????
app.post("/api/newuser", async function (req, res) {
    const user = await FindOne("Battlesprout", "user", req.body.email);
    if(user)
      return res.status(409).send({message: "Given email has already been registered"})
    
    await InsertOne("Battlesprout", "user", req.body.email)
})



const server = http.createServer(app);
server.listen(port, () => {
    
    console.log(`Server running on port ${port}`);
});

new ServerSocket(server);