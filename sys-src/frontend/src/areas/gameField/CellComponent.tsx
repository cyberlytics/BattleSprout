import { useEffect, useState } from 'react';
import { CellState } from './GameField';
import splash from '../../assets/Wasser-Splash.png';
import seed from '../../assets/Samen.png';
import flower from '../../assets/Blume.png';
import earth from '../../assets/Erde.png';

interface IProps {
    index: number;
    cellState: CellState;
    onPlantPlaced: Function;
}

const Cell = (props: IProps) => {
    const { index, cellState, onPlantPlaced } = props;

    const [cellOpacity, setCellOpacity] = useState(1);
    const [cellBackground, setCellBackground] = useState('');

    const handleCellHover = () => {
        setCellOpacity(0.7);
    };

    const handleCellLeave = () => {
        setCellOpacity(1);
    };

    useEffect(() => {
        switch (cellState) {
            case CellState.EMPTY: {
                setCellBackground(earth);
                break;
            }
            case CellState.SETUP: {
                setCellBackground(seed);
                break;
            }
            case CellState.PLANT: {
                setCellBackground(seed);
                break;
            }
            case CellState.HIT: {
                setCellBackground(flower);
                break;
            }
            case CellState.MISS: {
                setCellBackground(splash);
                break;
            }
        }
    }, [cellState]);

    return (
        <div
            className='cell-component'
            style={{
                backgroundImage: `url(${cellBackground})`,
                backgroundSize: 'cover',
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
