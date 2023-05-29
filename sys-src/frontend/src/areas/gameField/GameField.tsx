import { Typography } from '@mui/material';
import { Stage, Layer, Text, Rect, Circle } from 'react-konva';


//Spielfeld Komponente
export const GameFIeld = () => {

    return (<div>
            <Typography variant='h2'>{'Spielfeld'}</Typography>
            <Stage width={window.innerWidth} height={window.innerHeight}>
            <Layer fill="red">
                <Rect width={50} height={50} fill="red" />
                <Circle x={200} y={200} stroke="black" radius={50} />
            </Layer>
            </Stage>
        </div>);
};
