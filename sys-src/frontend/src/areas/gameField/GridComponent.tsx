import { useState } from "react";
import Cell from "./CellComponent";
import { CellState } from "./GameField";

const dummyData: number[][] = [
  [0,1,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,1,1,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,1,1,1,1,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,1,1,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,1,0,0,0,0,0,0,1,0]
]

const Grid: React.FC = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
    const handleCellHover = (index: number) => {
      setHoveredIndex(index);
    };
  
    const gridStyle = {
      display: 'grid',
      gridTemplateColumns: 'repeat(10, 40px)',
      marginRight: '64px'
    };
  
    return (
      <div style={gridStyle}>
        {Array.from(Array(100).keys()).map((index) => (
          <Cell
            key={index}
            index={index}
            onMouseEnter={() => handleCellHover(index)}
            onMouseLeave={() => handleCellHover(0)}
            cellState={CellState.EMPTY}
          />
        ))}
      </div>
    );
  };

  export default Grid;