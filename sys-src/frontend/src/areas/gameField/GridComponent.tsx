import { useEffect, useState } from 'react';
import Cell from './CellComponent';
import { CellState } from './GameField';

// const dummyData: number[][] = [
//     [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
// ];

interface ICell {
    index: number;
    state: CellState;
}

const Grid = () => {
    const [cellArray, setCellArray] = useState<ICell[]>(initCells);

    function initCells() {
        const cells: ICell[] = [];
        for (let i = 0; i < 100; i++) {
            cells.push({ index: i, state: CellState.EMPTY });
        }
        return cells;
    }

    function placePlant(index: number) {
        const updatedArray = cellArray.map((cellItem) => {
            if (cellItem.index === index) {
                return { ...cellItem, state: CellState.PLANT };
            }
            return cellItem;
        });
        setCellArray(updatedArray);
    }

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(10, 40px)',
                marginRight: '64px',
                background: 'white',
            }}
        >
            {cellArray.map((cellItem) => (
                <Cell
                    key={cellItem.index}
                    index={cellItem.index}
                    onPlantPlaced={() => placePlant(cellItem.index)}
                    cellState={cellItem.state}
                />
            ))}
        </div>
    );
};

export default Grid;
