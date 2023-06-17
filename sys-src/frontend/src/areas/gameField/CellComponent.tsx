import { useEffect, useState } from 'react';
import { CellState } from './GameField';

interface IProps {
    index: number;
    cellState: CellState;
    onPlantPlaced: Function;
}

const Cell = (props: IProps) => {
    const { index, cellState, onPlantPlaced } = props;

    const [cellOpacity, setCellOpacity] = useState(1);
    const [cellColor, setCellColor] = useState('');

    const handleCellHover = () => {
        setCellOpacity(0.7);
    };

    const handleCellLeave = () => {
        setCellOpacity(1);
    };

    useEffect(() => {
        switch (cellState) {
            case CellState.EMPTY: {
                setCellColor('#8f664d');
                break;
            }
            case CellState.SETUP: {
                setCellColor("blue");
                break;
            }
            case CellState.PLANT: {
                setCellColor('green');
                break;
            }
            case CellState.HIT: {
                setCellColor('red');
                break;
            }
            case CellState.MISS: {
                setCellColor('gray');
                break;
            }
        }
    }, [cellState]);

    return (
        <div
            className='cell-component'
            style={{
                backgroundColor: cellColor,
                width: '40px',
                height: '40px',
                border: '1px solid black',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: cellOpacity,
            }}
            onMouseEnter={handleCellHover}
            onMouseLeave={handleCellLeave}
            onClick={() => {
                onPlantPlaced();
            }}
        ></div>
    );
};

export default Cell;
