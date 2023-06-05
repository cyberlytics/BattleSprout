import { Typography } from '@mui/material';
import React from 'react';
import { Stage, Layer, Text, Rect, Circle } from 'react-konva';

const gridSize = 6;
    const cellSize = 35;
    const stroke = 2;


function generateCells() {
    const cells = [];

    

    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {

            const x = stroke + row * cellSize ;
            const y = stroke + col * cellSize ;
            const width = cellSize ;
            const height = cellSize;

            const rect = <Rect
                key={`${row}-${col}`}
                x={x} y={y}
                width={width} height={height}
                fill={"#AE7867"}
                stroke={"#C19587"}

            />
            
            

            cells.push(
                <Rect key={`${row}-${col}`} 
                    x={x} y={y}
                    width={width} height={height}
                    strokeWidth={stroke}
                    fill={"#AE7867"}
                    stroke={"#C19587"}
                    />
                    
                    );
                
        }
    }

    return cells;
}

const INITIAL_STATE = generateCells();


export const GameField = () => {
    const [cells, setCells] = React.useState(INITIAL_STATE);
    const [rectColors, setRectColors] = React.useState(Array(cells.length).fill("#AE7867"));
  
    const handleMouseOver = (index: number) => {
      const newRectColors = [...rectColors];
      newRectColors[index] = "#FF0000";
      setRectColors(newRectColors);
      console.log({col: Math.floor(index / gridSize), row:  index % gridSize});
    };

    const handleMouseOut = (index: any) => {
        const newRectColors = [...rectColors];
        newRectColors[index] = "#AE7867";
        setRectColors(newRectColors);
    }
  
    return (
      <div>
        <Typography variant="h2">Spielfeld</Typography>
        <Stage width={window.innerWidth} height={window.innerHeight} perfectDrawEnabled={false}>
          <Layer fill="red">
            {cells.map((cell, index) => (
              <Rect
                key={cell.key}
                x={cell.props.x}
                y={cell.props.y}
                width={cell.props.width}
                height={cell.props.height}
                strokeWidth={cell.props.strokeWidth}
                fill={rectColors[index]}
                stroke={cell.props.stroke}
                onMouseOver={() => handleMouseOver(index)}
                onMouseOut={() => handleMouseOut(index)}
              />
            ))}
          </Layer>
        </Stage>
      </div>
    );
  };
