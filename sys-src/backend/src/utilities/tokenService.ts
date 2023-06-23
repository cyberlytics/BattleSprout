const jwt = require("jsonwebtoken");
require('dotenv').config();
import { Request, Response } from 'express';




class TokenService{
    generateAuthToken(info: string){
        const token = jwt.sign({info}, process.env.SECRET_KEY, {expiresIn: "2h"});
        return token;
    }

    //Returns the payload decoded if the signature is valid, null if token is invalid
    verify(token: string) {   
        try{
            var verify = jwt.verify(token, process.env.SECRET_KEY);
            return verify
        }     
        catch(err){
            console.error('Token verification failed:', err);
            return null
        }
    }

    //Returns the decoded payload without verifying if the signature is valid
    decode(token: string) {
        return jwt.decode(
            token
        )
    }

    authenticate(req: Request,res: Response ,next: any){
        //Check for presence of token in request header
        
        const token = req.headers.authorization;
        
        if(!token){
            return res.status(401).json({message: "Missing Token."});
        }

        try{
            console.log(token);
            //Verify the token
            //const decoded = this.verify(token);
            const decoded = jwt.verify(token, process.env.SECRET_KEY);

            //attach info about the verification of the token to the users request
           // req.body.name = "test";
            req.body.email = decoded.info;
            console.log("authenticate:"+req.body);
            next();
        }catch(error){
            return res.status(401).json({message:'Something went wrong while trying to authenticate token', error})
        }
    }
}
const tokenService = new TokenService();

export default tokenService;