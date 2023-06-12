import {render,fireEvent,screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { FriendList } from './FriendList';

describe('Friendlist component tests', () =>{
        test('checks if Open-Drawer-Button exist', ()=>{
            render(<FriendList/>);

            const openDrawer = screen.getByTestId('Open-Drawer-Button');

            expect(openDrawer).not.toBeDisabled();
            expect(openDrawer).toBeInTheDocument();
        })

        test('checks Open-Drawer-Button click',()=>{
            render(<FriendList/>);

            const openDrawer = screen.getByTestId('Open-Drawer-Button');
            const onOpen = jest.fn();
            fireEvent.click(openDrawer);
            
            expect(onOpen).toHaveBeenCalled();
        })

        test.todo('checks if Add-Friend-Button is working')
        test.todo('checks if Input-FriendName is working')
})

export {}