import { Request, Response } from 'express';
import { Friend, IFriend } from '../models/friend';
import { User } from '../models/user';
import { connect, FindOne, InsertOne, UpdateOne } from '../db';

// Get all friends
export const getAllFriends = async (req: Request, res: Response): Promise<void> => {
  await connect();
  const userEmail = req.body.email;
  
  const user = await FindOne("test", "user", { "email": userEmail});
  try {
    const friends = user.friends || []; 
    console.log(friends);
    res.json(friends);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve friends' });
  }
};
// Add a friend
export const addFriend = async (req: Request, res: Response): Promise<void> => {
await connect();

  const userEmail = req.body.email;
  const filter= {email:userEmail};


  const user = await FindOne("test", "user", { "email": userEmail });
  try { 
    const newFriend: IFriend = new Friend({
      name: req.body.name,
      image: req.body.image || false,
      onlineStatus: req.body.onlineStatus || false
    });

    console.log(user);

    if (user) {
      // Find friends
      user.friends = user.friends || [];
      // Add the friend to the user's friends array
      user.friends.push(newFriend);   
      //
      const update = {$push: {friends:newFriend}};
      // Update the users friend in the database
      await UpdateOne("test", "user", filter, update);
      console.log(user);
    }
    res.json(newFriend);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add friend' });
  }
};


// Delete a friend
export const deleteFriend = async (req: Request, res: Response): Promise<void> => {
await connect();
  const userEmail = req.body.email;
  const friendName = req.body.name;
  const filter= {email:userEmail};

  const user = await FindOne("test", "user", { "email": userEmail });
  try {
    const updatedFriends = {$pull: {friends: {name: friendName}}};
    await UpdateOne("test","user",filter,updatedFriends);

    
    res.json({ message: 'Friend deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete friend' });
  }
};

