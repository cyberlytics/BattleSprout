import { useState } from "react";
import { CellProps, CellState } from "./GameField";

const Cell: React.FC<CellProps> = ({ index, cellState }) => {
    const [isHovered, setIsHovered] = useState(false);
  
    const handleCellHover = () => {
      setIsHovered(true);
    };
  
    const handleCellLeave = () => {
      setIsHovered(false);
    };
     
    const stateColor = (cellState: CellState) => {
      switch(cellState) {
        case CellState.EMPTY: {return '#AE7867'}
        case CellState.SHIP: {return 'black'}
        case CellState.HIT: {return 'blue'}
        case CellState.MISS: {return 'red'}
      }
    }
  
    const cellStyle = {
      backgroundColor: stateColor(cellState),
      width: '40px',
      height: '40px',
      border: '1px solid #C19587',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
  
    return (
      <div
        style={cellStyle}
        onMouseEnter={handleCellHover}
        onMouseLeave={handleCellLeave}
        onClick={() => {console.log(index)}}
      >
        {}
      </div>
    );
  };

export default Cell;