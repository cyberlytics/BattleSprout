import { Schema, Document, model  } from "mongoose";

const mongoose = require("mongoose");

interface IFriend extends Document{
    name: string;
    image: any;
    onlineStatus: boolean;
}

const friendSchema = new Schema<IFriend>({
    name: {type:String, required: true},
    image: {type:String},
    onlineStatus:{type: Boolean, default:false}
})

interface IFriendModel extends IFriend, Document {}

const Friend = model<IFriendModel>('Friend' , friendSchema);

export {Friend, IFriend}