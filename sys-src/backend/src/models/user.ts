const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({	
	email: { type: String, required: true },
	password: { type: String, required: true },
	friends: {type:mongoose.Schema.Types.ObjectId, ref: "friend"}
});

const User = mongoose.model("user", userSchema);

export {
	User
}