import express = require('express');
import friendsController = require ('../controllers/friendsController');

const router = express.Router();

//get all friends
router.get('/friends',friendsController.getAllFriends);

//Add friend
router.post('/friends', friendsController.addFriend);

//delete friend
router.delete('/friends:id', friendsController.deleteFriend);

module.exports = router;