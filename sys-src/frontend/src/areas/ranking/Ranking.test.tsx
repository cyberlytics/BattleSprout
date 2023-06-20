import {render,screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Ranking } from './Ranking';

describe('Ranklist component tests', () =>{
        test('renders Titel', ()=>{
            render(<Ranking/>);

            const Titel = screen.getByTestId('Titel');

            expect(Titel).toBeInTheDocument();
        });
        test('renders Ranklist', ()=>{
            render(<Ranking/>);

            const List = screen.getByTestId('Ranklist');

            expect(List).toBeInTheDocument();
        });
})

export {}