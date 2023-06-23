import express = require('express');
import friendsController = require ('../controllers/friendsController');
import TokenService from '../utilities/tokenService';
import { Request, Response } from 'express';


const authenticate = TokenService.authenticate;


const router = express.Router();

//get all friends
router.get("/api/friends",authenticate,friendsController.getAllFriends);

//Add friend
router.post("/api/friends", authenticate, friendsController.addFriend);

//delete friend
router.delete("/api/friends",authenticate,friendsController.deleteFriend);

module.exports = router;