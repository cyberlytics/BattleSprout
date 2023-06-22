const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({	
	email: { type: String, required: true },
	password: { type: String, required: true },
	username: {type: String, required: true},
	friends: { type: mongoose.Schema.Types.ObjectId, ref: "Friend"}
});

const User = mongoose.model("user", userSchema);

export {
	User
}