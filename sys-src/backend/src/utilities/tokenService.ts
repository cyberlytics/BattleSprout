const jwt = require("jsonwebtoken");
require('dotenv').config()

class TokenService{
    generateAuthToken(info: string){
        const token = jwt.sign({info}, process.env.SECRET_KEY, {expiresIn: "2h"});
        console.log(token)
        return token;
    }

    //Returns the payload decoded if the signature is valid, null if token is invalid
    verify(token: string) {   
        try{
            var verify = jwt.verify(token, process.env.SECRET_KEY);
            return verify
        }     
        catch(err){
            return null
        }
    }

    //Returns the decoded payload without verifying if the signature is valid
    decode(token: string) {
        return jwt.decode(
            token
        )
    }
}

export default TokenService