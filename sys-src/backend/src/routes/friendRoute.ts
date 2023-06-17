import express = require('express');
import friendsController = require ('../controllers/friendsController');

const router = express.Router();

//get all friends
router.get("/api/friends",friendsController.getAllFriends);

//Add friend
router.post("/api/friends", friendsController.addFriend);

//delete friend
router.delete("/api/friends/:id", friendsController.deleteFriend);

module.exports = router;