const express = require('express');
const router = express.Router();
const friendsController = require('../controllers/friendsController')



//get all friends
router.get('/friends',friendsController.getAllFriends);

//Add friends
router.post('/friends', friendsController.addFriend);


//delete friends
router.delete('/friends:id', friendsController.deleteFriend);

module.exports = router;