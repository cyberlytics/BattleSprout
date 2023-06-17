import {Request,Response} from 'express';
import {Friend ,IFriend} from '../models/friend';


// Get all friends
export const getAllFriends = async (req: Request, res: Response): Promise<void> => {
    try {
      const friends: IFriend[] = await Friend.find();
      res.json(friends);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
// Add a friend
  export const addFriend = async  (req: Request, res: Response): Promise<void> =>{
    try{
      const newFriend: IFriend = new Friend({
        name: req.body.name,
        image: req.body.image,
        onlineStatus: req.body.onlineStatus || false
      });


        const savedFriend: IFriend = await newFriend.save();
        res.json(savedFriend);
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Failed to add friend'});
    }
  };
// Delete a friend
 export const deleteFriend = async  (req: Request, res: Response): Promise<void> =>{
    try{
      const friendId = req.params.id;
      await Friend.findByIdAndRemove(friendId);
      res.json({ message: 'Friend deleted successfully' });
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Deleted friend'});
    }
  };

