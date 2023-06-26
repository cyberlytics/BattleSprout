import{
    getAllFriends,
    addFriend,
    deleteFriend
} from '../controllers/friendsController';
import { Request,Response } from 'express';
import { InsertOne,FindOne,UpdateOne } from '../db';
import exp from 'constants';

//Mock database functions

jest.mock('../db', () => ({
    connect: jest.fn(),
    FindOne: jest.fn(),
    InsertOne: jest.fn(),
    UpdateOne: jest.fn(),
  }));


  
  describe('friendsController', () => {
    let req: Request;
    let res: Response;
  
    beforeEach(() => {
      req = {
        body:{
          name: 'testName',
        }
      } as Request;
      res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as unknown as Response;
    });

    afterEach(() => {
      jest.clearAllMocks();
    });


  //getAllFriends Tests
    test('getAllFriends should retrieve all friends successfully', async () => {
      // Arrange
      req.body = {
        email: 'test@example.com',
      };
  
      // Mock the FindOne function
      const mockFindOne = jest.fn().mockResolvedValue(
        {    
          _id: 'mocked-id',
          email: 'test@example.com',
          password: '123',
          username: '123',
          friends: [
            {
              name: 'test',
              onlineStatus: false,          
            }
          ]
        }
      )
     
      jest.mock('../db', () => ({
        ...jest.requireActual('../db'),
        FindOne: jest.fn().mockImplementation(mockFindOne),
      }));
      // Act
      await getAllFriends(req, res);


      // Assert
      expect(mockFindOne).toHaveBeenCalledWith('test', 'user', { email: 'test@example.com' });
      expect(res.json).toHaveBeenCalledWith(
        
        expect.arrayContaining([
          expect.objectContaining({
            _id: 'mocked-id',
            name: 'test',
            image: 'false',
            onlineStatus: false,
          }),
        ])
      );
     
    });
  


    test('getAllFriends should handle errors when retrieving friends', async () => {
      //Arrange
      req.body = {
        email: 'test@example.com',
      };
  
      // Mock the FindOne function to throw an error
      const mockFindOne = jest.fn().mockRejectedValue(new Error('Failed to retrieve friends'));
      jest.mock('../db', () => ({
        ...jest.requireActual('../db'),
        FindOne: jest.fn().mockImplementation(mockFindOne),
      }));

      // Act
  
      await getAllFriends(req, res);
      // Assert
      expect(mockFindOne).toHaveBeenCalledWith('test', 'user', { email: 'test@example.com' });
      expect(res.json).toHaveBeenCalledWith([]);
    });

    test('addFriend should add friend to the users friends',async()=>{
      // Arrange
      req.body = {
        email: 'test@example.com',
      };

      //mock finding user in database

      const mockFindOne = jest.fn().mockResolvedValue({
        user: 'testUser',
      })
      const mockUpdateOne = jest.fn().mockResolvedValue(true);

      //mock updating the users friendlist

      jest.mock('../db', () => ({
        ...jest.requireActual('../db'),
        FindOne: jest.fn().mockImplementation(mockFindOne),
        UpdateOne: jest.fn().mockImplementation(mockUpdateOne)
      }));



      // Act
      await addFriend(req,res);

      // Assert
      expect(mockFindOne).toHaveBeenCalledWith('test', 'user', { email: 'test@example.com' });
      expect(mockUpdateOne).toHaveBeenCalledWith('test', 'user', { email: 'test@example.com' }, {
        $push: {
          friends: {
            name: 'testName',
            image: false,
            onlineStatus: false
          }}
      });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Failed to add friend' });

    })
    test('deleteFriend should dele friend from the users friends',async ()=>{
      // Arrange
      req.body = {
        email: 'test@example.com',
      };

      const mockUpdateOne = jest.fn().mockResolvedValue(true);
      jest.mock('../db', () => ({
        ...jest.requireActual('../db'),
        UpdateOne: jest.fn().mockImplementation(mockUpdateOne)
      }));

      // Act
      await deleteFriend(req,res);

      // Assert

      expect(mockUpdateOne).toHaveBeenCalledWith('test', 'user', { email: 'test@example.com' }, {
        $pull: {
          friends: {
            name: 'testName',
            image: false,
            onlineStatus: false
          }}
      });
      
      expect(res.json).toHaveBeenCalledWith({ message: 'Friend deleted successfully' })

    })
   

  });
  