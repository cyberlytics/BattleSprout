import { useEffect, useState } from 'react';
import Cell from './CellComponent';
import { CellState } from './GameField';

interface ICell {
    index: number;
    state: CellState;
}

const Grid = () => {
    //TODO: Array soll vom Backend verwaltet werden
    //Frontend zeigt Array nur an und übergibt Aufrufe mit Clicks der Zellen
    //Backend muss 2 verschiedene Versionen jedes Spielfelds speichern (Pfanzen sichtbar / unsichtbar)
    const [cellArray, setCellArray] = useState<ICell[]>(initCells);

    function initCells() {
        const cells: ICell[] = [];
        for (let i = 0; i < 100; i++) {
            cells.push({ index: i, state: CellState.EMPTY });
        }
        return cells;
    }

    function placePlant(index: number) {
        //TODO: Hier muss an das Backend übergeben werden, welche Zelle geklickt wurde.
        //Das Backend schickt wiederum zurück, was mit der Zelle (un den anderen) passiert
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
