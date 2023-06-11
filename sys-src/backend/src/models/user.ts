const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({	
	email: { type: String, required: true },
	password: { type: String, required: true },
});

function generateAuthToken(email: string){
	const token = jwt.sign({ _id: email }, "process.env.JWTPRIVATEKEY", {
		expiresIn: "2h",
	});
	return token;
}

const User = mongoose.model("user", userSchema);

export {
	User, generateAuthToken
}