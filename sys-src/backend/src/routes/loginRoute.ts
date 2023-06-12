const router = require("express").Router();
import {connect, FindOne} from '../db'
import TokenService from '../utilities/tokenService'

router.post("/api/login", async function(req: any, res: any){
    connect();  
    
    const user = await FindOne("test", "user", {"email": req.body.email})
    console.log(user)
    
    if(!user){
      console.log("Invalid Email or Password");
      return res.status(401).send({message: "Invalid Email or Password"});}
    
      if(req.body.password != user.password){
        console.log(req.body.password)
        return res.status(401).send({message: "Wrong Password"});}
        
    let token = new TokenService().generateAuthToken(req.body.email);   
    res.status(200).send({data: token, message: "You are now logged in"});
});


module.exports = router;