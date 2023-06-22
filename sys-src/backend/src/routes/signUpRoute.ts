const router = require("express").Router();
import {connect, InsertOne, FindOne} from '../db'
const { User } = require("../models/user");

router.post("/api/signup", async function (req:any, res:any) {
    connect();
    const email = await FindOne("test", "user", { "email": req.body.email });
    if (email){
    console.log("User alread exist")
      return res
        .status(409)
        .send({ message: "User with given email already Exist!" });}
    
    const username = await FindOne("test", "user", {"username": req.body.username});
    if(username){
      console.log("Username not unique")
      return res.status(409).send({message: "Username must be unique"});
    }
  
    const usercredentials = new User({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
    })
    InsertOne("test", "user", usercredentials)
    return res.status(200).send({message: "User registered."})    
});

module.exports = router