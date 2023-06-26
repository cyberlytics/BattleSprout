import { render, screen, fireEvent } from '@testing-library/react';
import { CreateGame } from '../areas/createGame/CreateGame';

// jest Test for the CreateGame component
describe('CreateGame', () => {
  test('renders correctly', () => {
    render(<CreateGame />);

    // test if the title is rendered
    const titleElement = screen.getByText('Spiel erstellen');
    expect(titleElement).toBeInTheDocument();

    // test if the back button is rendered
    const backButton = screen.getByRole('button', { name: 'Zurück' });
    expect(backButton).toBeInTheDocument();

    // test if the game field size radio buttons are rendered
    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons).toHaveLength(5);

    // test if the start button is rendered
    const startButton = screen.getByRole('button', { name: 'Starten' });
    expect(startButton).toBeInTheDocument();
  });

  test('navigates to home page when back button is clicked', () => {
    // mock the useNavigate function
    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      useNavigate: () => mockNavigate,
    }));

    render(<CreateGame />);

    // test clicking the back button
    const backButton = screen.getByRole('button', { name: 'Zurück' });
    fireEvent.click(backButton);

    // test if the navigate function is called with the right argument
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  test('navigates to game field page when start button is clicked', async () => {
    // mock the useNavigate function
    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      useNavigate: () => mockNavigate,
    }));

    // mock the axios post request
    jest.mock('axios', () => ({
      post: jest.fn().mockResolvedValue({ data: { gameId: '12345' } }),
    }));

    render(<CreateGame />);

    // test clicking the start button
    const startButton = screen.getByRole('button', { name: 'Starten' });
    fireEvent.click(startButton);

    // test if the navigate function is called with the correct argument
    expect(mockNavigate).toHaveBeenCalledWith('/GameField/12345', {
      state: '10',
    });
  });
});