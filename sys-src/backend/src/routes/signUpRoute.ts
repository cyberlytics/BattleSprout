const router = require("express").Router();
import {connect, InsertOne, FindOne} from '../db'
const { User } = require("../models/user");

router.post("/api/signup", async function (req:any, res:any) {
    connect();
    const user = await FindOne("test", "user", { "email": req.body.email });
    if (user){
    console.log("User alread exist")
      return res
        .status(409)
        .send({ message: "User with given email already Exist!" });}
  
    const usercredentials = new User({
      email: req.body.email,
      password: req.body.password,
    })
    InsertOne("test", "user", usercredentials)
    
});

module.exports = router