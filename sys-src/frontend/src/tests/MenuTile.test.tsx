import { render, fireEvent } from '@testing-library/react';
import { MenuTile } from '../areas/mainMenu/components/MenuTile';
import { AddCircleOutlined, GroupAdd } from '@mui/icons-material';

describe('MenuTile Test', () => {
    test('renders title and content', () => {
        const { getByText } = render(
            <MenuTile
                icon={AddCircleOutlined}
                title='Spiel erstellen'
                content='Erstelle ein Spiel, dem ein anderer beitreten kann'
                action={() => {}}
            />
        );

        expect(getByText('Spiel erstellen')).toBeInTheDocument;
        expect(getByText('Erstelle ein Spiel, dem ein anderer beitreten kann'))
            .toBeInTheDocument;
    });

    test('calls action when clicked', () => {
        const actionMock = jest.fn();
        const { getByRole } = render(
            <MenuTile
                icon={GroupAdd}
                title='Spiel beitreten'
                content='Tritt einem Spiel bei'
                action={actionMock}
            />
        );

        fireEvent.click(getByRole('button'));
        expect(actionMock).toHaveBeenCalled();
    });
});
