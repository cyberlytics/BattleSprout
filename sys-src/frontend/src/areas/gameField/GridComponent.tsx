import React, { MutableRefObject, useState } from 'react';
import Cell from './CellComponent';
import { CellState } from './GameField';
import { Socket } from 'socket.io-client';

interface ICell {
    index: number;
    state: CellState;
}

interface IProps {
    socketContext: MutableRefObject<Socket>;
    gameFieldSize: number;
}

export const GridComponent = (props: IProps) => {
    const { socketContext, gameFieldSize } = props;
    //TODO: Array soll vom Backend verwaltet werden
    //Frontend zeigt Array nur an und übergibt Aufrufe mit Clicks der Zellen
    //Backend muss 2 verschiedene Versionen jedes Spielfelds speichern (Pfanzen sichtbar / unsichtbar)
    const [cellArray, setCellArray] = useState<ICell[]>(initCells);

    function initCells() {
        const cells: ICell[] = [];
        const size = gameFieldSize * gameFieldSize;
        for (let i = 0; i < size; i++) {
            cells.push({ index: i, state: CellState.EMPTY });
        }
        return cells;
    }

    function handleCellClick(index: number) {
        const { x, y } = convertIndexToXY(index);

        //TODO: Hier muss an das Backend übergeben werden, welche Zelle geklickt wurde.
        //Das Backend schickt wiederum zurück, was mit der Zelle (un den anderen) passiert

        //zum Testen:
        const updatedArray = cellArray.map((cellItem) => {
            if (cellItem.index === index) {
                return { ...cellItem, state: CellState.PLANT };
            }
            return cellItem;
        });
        setCellArray(updatedArray);
    }

    function convertXYToIndex(x: number, y: number) {
        return y * gameFieldSize + x;
    }

    function convertIndexToXY(index: number) {
        const x = index % gameFieldSize;
        const y = Math.floor(index / gameFieldSize);
        return { x, y };
    }

    return (        
        <div
            style={{                
                display: 'grid',
                gridTemplateColumns: 'repeat(' + `${gameFieldSize}` + ', 40px)',
                marginRight: '64px',
                
            }}
        >
            {cellArray.map((cellItem) => (
                <Cell
                    key={cellItem.index}
                    index={cellItem.index}
                    onPlantPlaced={() => handleCellClick(cellItem.index)}
                    cellState={cellItem.state}
                />
            ))}
        </div>
    );
};
