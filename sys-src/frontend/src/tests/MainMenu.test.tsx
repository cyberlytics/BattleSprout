import { render, fireEvent, screen } from '@testing-library/react';
import { MainMenu } from '../areas/mainMenu/MainMenu';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => mockedUsedNavigate,
}));

describe('MainMenu', () => {
    test('renders menu tiles', () => {
        const { getByText } = render(<MainMenu />);

        expect(getByText('Spiel erstellen')).toBeInTheDocument;
        expect(getByText('Spiel beitreten')).toBeInTheDocument;
        expect(getByText('Rangliste')).toBeInTheDocument;
    });

    test('opens and closes join game dialog', () => {
        const { getByText, getByTestId } = render(<MainMenu />);

        const textContent = 'Geben Sie die Game ID zum Beitreten an:';

        {
            let text;
            try {
                text = screen.getByText(textContent);
            } catch {
                text = '';
            }
            expect(text).toBe('');
        }

        {
            fireEvent.click(getByText('Spiel beitreten'));
            const text = getByText(textContent);
            expect(text).toBeVisible;
        }

        {
            fireEvent.click(getByText('Abbrechen'));
            let text;
            try {
                text = screen.getByText(textContent);
            } catch {
                text = '';
            }
            expect(getByText(textContent)).not.toBeVisible;
        }
    });
});
