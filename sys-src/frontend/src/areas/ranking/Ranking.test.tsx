import {render,screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Ranking } from './Ranking';
import axios from 'axios';

describe('Ranklist component tests', () =>{
    beforeEach(() => {
        //Axios.get mock 
        jest.spyOn(axios, 'get').mockResolvedValue({
            data: [
                {Name: 'Antonio', Points: 100, Position: 1},
                {Name: 'xXGamerXx', Points: 200, Position: 2},
                {Name: 'PlantLover', Points: 150, Position: 3}
            ]
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    })

    test('renders correctly', async ()=>{
        render(<Ranking/>);

        //Test ob Titel und Ranklist da sind
        expect(screen.getByTestId('Titel')).toBeInTheDocument();
        expect(screen.getByTestId('Ranklist')).toBeInTheDocument();

        await screen.findByTestId('Ranklist');

        //Test ob Ränge in der Liste
        expect(screen.getByText('PLATZ: 1 Name: Antonio')).toBeInTheDocument();
        expect(screen.getByText('PLATZ: 2 Name: xXGamerXx')).toBeInTheDocument();
        expect(screen.getByText('PLATZ: 3 Name: PlantLover')).toBeInTheDocument();
    });

    test('fetches and updates ranklist on button click', async () => {
        render(<Ranking/>);

        expect(screen.queryByText('PLATZ: 1 Name: Antonio')).not.toBeInTheDocument();

        // Button klicken, um die Rangliste abzurufen
        const button = screen.getByText('CLICK');
        button.click();

        await screen.findByTestId('Ranklist');

        expect(screen.getByText('PLATZ: 1 Name: Antonio')).toBeInTheDocument();
        expect(screen.getByText('PLATZ: 2 Name: xXGamerXx')).toBeInTheDocument();
        expect(screen.getByText('PLATZ: 3 Name: PlantLover')).toBeInTheDocument();
    });
})

export {}