import { Request, Response } from 'express';
import { Friend, IFriend } from '../models/friend';
import { User } from '../models/user';
import { connect, FindOne, InsertOne, UpdateOne } from '../db';

// Get all friends
export const getAllFriends = async (req: Request, res: Response): Promise<void> => {
  await connect();
  const userEmail = req.body.email;
  
  const user = await FindOne("test", "user", { "email": userEmail});
  const friends = user.friends;
  res.json(friends);
    
 
};
// Add a friend
export const addFriend = async (req: Request, res: Response): Promise<void> => {
await connect();

  const userEmail = req.body.email;
  const filter= {email:userEmail};
  
    const newFriend: IFriend = new Friend({
      name: req.body.name,
      image: req.body.image || false,
      onlineStatus: req.body.onlineStatus || false
    });  
      const update = {$push: {friends:newFriend}};
      // Update the users friend in the database
      await UpdateOne("test", "user", filter, update);
    
    res.json(newFriend);
  
};


// Delete a friend
export const deleteFriend = async (req: Request, res: Response): Promise<void> => {
await connect();
  const userEmail = req.body.email;
  const friendName = req.body.name;
  const filter= {email:userEmail};

  const updatedFriends = {$pull: {friends: {name: friendName}}};
  await UpdateOne("test","user",filter,updatedFriends);
  res.json({ message: 'Friend deleted successfully' });
  
};

