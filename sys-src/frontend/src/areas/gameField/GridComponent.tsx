import React, { MutableRefObject, useEffect, useState } from 'react';
import Cell from './CellComponent';
import { CellState } from './GameField';
import { Socket } from 'socket.io-client';
import { PlantTile } from '../../PlantTile.';
import { Vector2 } from '../../Vector2';
import { GameState } from './GameState';

interface ICell {
    index: number;
    state: CellState;
}

interface IProps {
    gameFieldSize: number;
    addPlantTile: Function;

    socket: Socket;
    splashList: { hit: boolean; x: number; y: number; sunk: boolean }[];
    setupDone: boolean;

    isUrTurn: boolean;
    gameState: GameState;
}

export const GridComponent = (props: IProps) => {
    const {
        gameFieldSize,
        addPlantTile,
        setupDone,
        splashList,
        gameState,
        socket,
        isUrTurn,
    } = props;
    //TODO: Array soll vom Backend verwaltet werden
    //Frontend zeigt Array nur an und übergibt Aufrufe mit Clicks der Zellen
    //Backend muss 2 verschiedene Versionen jedes Spielfelds speichern (Pfanzen sichtbar / unsichtbar)
    const [cellArray, setCellArray] = useState<ICell[]>(initCells);

    useEffect(() => {
        if (setupDone) {
            setupToPlant();
        }

        updateSplashes();
    }, [setupDone, splashList]);

    function initCells() {
        const cells: ICell[] = [];
        const size = gameFieldSize * gameFieldSize;
        for (let i = 0; i < size; i++) {
            cells.push({ index: i, state: CellState.EMPTY });
        }
        return cells;
    }

    function handleCellClick(index: number) {
        if (gameState === GameState.setup) {
            handleSetupCellClick(index);
        }

        if (gameState === GameState.playing) {
            handlePlayingCellClick(index);
        }
    }

    function handlePlayingCellClick(index: number) {
        console.log('isUrTurn: ' + isUrTurn);
        if (!isUrTurn) return;

        console.log('Its my turn!');
        const { x, y } = convertIndexToXY(index);
        socket.emit('setSplash', new Vector2(x, y));
    }

    function handleSetupCellClick(index: number) {
        const { x, y } = convertIndexToXY(index);

        if (!addPlantTile(new PlantTile(new Vector2(x, y), false))) {
            return;
        }

        //zum Testen:
        const updatedArray = cellArray.map((cellItem) => {
            //Wenn Zelle EMPTY wird beim Klicken eine Pflanzzelle gesetzt
            if (
                cellItem.index === index &&
                cellItem.state === CellState.EMPTY
            ) {
                return { ...cellItem, state: CellState.SETUP };
            }
            //Wenn Zelle bereits PLANT wird die Zelle bei erneutem Klicken wieder auf EMPTY gesetzt
            else if (
                cellItem.index === index &&
                cellItem.state === CellState.PLANT
            ) {
                return { ...cellItem, state: CellState.EMPTY };
            }
            return cellItem;
        });
        setCellArray(updatedArray);
    }

    function updateSplashes() {
        splashList.forEach((splash) => {
            const index = convertXYToIndex(splash.x, splash.y);
            const updatedArray = cellArray.map((cellItem) => {
                if (cellItem.index === index) {
                    return {
                        ...cellItem,
                        state: splash.hit ? CellState.HIT : CellState.MISS,
                    };
                }
                return cellItem;
            });
            setCellArray(updatedArray);
        });
    }

    function setupToPlant() {
        const updatedArray = cellArray.map((cellItem) => {
            if (cellItem.state === CellState.SETUP) {
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
                background: 'white',
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
