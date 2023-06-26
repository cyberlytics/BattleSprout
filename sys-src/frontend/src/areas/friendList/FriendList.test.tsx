import {render,fireEvent,screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { FriendList } from './FriendList';
import axios from 'axios';

jest.mock('axios');

describe('Friendlist component tests', () =>{
        test('checks if Open-Drawer-Button exist', ()=>{
            render(<FriendList/>);

            const openDrawer = screen.getByTestId('Open-Drawer-Button');

            expect(openDrawer).not.toBeDisabled();
            expect(openDrawer).toBeInTheDocument();
        });

        test('checks Open-Drawer-Button click',()=>{
            render(<FriendList/>);

            const openDrawer = screen.getByTestId('Open-Drawer-Button');
            const toggleDrawerMock = jest.fn();
            openDrawer.onclick = toggleDrawerMock;
            fireEvent.click(openDrawer);
            expect(toggleDrawerMock).toHaveBeenCalled();
        });

        test('checks if Add-Friend-Button is working', async ()=>{
            render(<FriendList/>);

            const addFriendButton = screen.getByTestId('Add-Friend-Button');
            const inputFriendName = screen.getByTestId('Input-Friend-Name');
            const friendName = 'John Doe';
        
            fireEvent.change(inputFriendName, { target: { value: friendName } });
        
            // Mock the axios post request and provide a mock response
            jest.spyOn(axios, 'post').mockResolvedValue({ data: { name: friendName } });
        
            fireEvent.click(addFriendButton);
        
            const friendListItem = await screen.findByText(`Name des Freundes: ${friendName}`);
            expect(friendListItem).toBeInTheDocument();
        });

        test('checks if Input-FriendName is working',()=>{
            render(<FriendList />);
            const inputFriendName = screen.getByTestId('Input-Friend-Name')as HTMLInputElement;
        
            fireEvent.change(inputFriendName, { target: { value: 'John Doe' } });
        
            expect(inputFriendName.value).toBe('John Doe');
        });

        test('checks if Add-Friend-Button is disabled when no friend name is entered', () => {
            render(<FriendList />);
            const addFriendButton = screen.getByTestId('Add-Friend-Button');
            const inputFriendName = screen.getByTestId('Input-Friend-Name');
        
            fireEvent.change(inputFriendName, { target: { value: '' } });
        
            expect(addFriendButton).toBeDisabled();
        });

        test('checks if error dialog is shown when adding a friend fails', async () => {
            render(<FriendList />);
            const addFriendButton = screen.getByTestId('Add-Friend-Button');
            const inputFriendName = screen.getByTestId('Input-Friend-Name');
            const friendName = 'John Doe';
        
            fireEvent.change(inputFriendName, { target: { value: friendName } });
        
            jest.spyOn(axios, 'post').mockRejectedValue(new Error('Failed to add friend'));
        
            fireEvent.click(addFriendButton);
        
            const errorDialog = await screen.findByText('Fehlerhafte Eingabe');
            expect(errorDialog).toBeInTheDocument();
        });
})

export {}