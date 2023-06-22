import { Request, Response } from 'express';
import { Friend, IFriend } from '../models/friend';
import { User } from '../models/user';
import { connect, FindOne, InsertOne } from '../db'



// Get all friends
export const getAllFriends = async (req: Request, res: Response): Promise<void> => {
  await connect();
  const user = await FindOne("test", "user", { "email": req.body.email });
  try {
    const friends: IFriend[] = await Friend.find();
    res.json(friends);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
// Add a friend
export const addFriend = async (req: Request, res: Response): Promise<void> => {
await connect();

  const user = await FindOne("db", "user", { "email": req.body.email });
  try { 
    const newFriend: IFriend = new Friend({
      name: req.body.name,
      image: req.body.image,
      onlineStatus: req.body.onlineStatus || false
    });
    console.log(user);

    // Save the new friend document
    const savedFriend: IFriend = await newFriend.save();

    if (user) {
      // Add the friend to the user's friends array
      user.friends.push(savedFriend);   
      // Save the updated user document
      await InsertOne("db", "user", user);
    }
    res.json(savedFriend);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add friend' });
  }
};
// Delete a friend
export const deleteFriend = async (req: Request, res: Response): Promise<void> => {
await connect();
  try {
    const friendId = req.params.id;
    await Friend.findByIdAndRemove(friendId);
    res.json({ message: 'Friend deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Deleted friend' });
  }
};

