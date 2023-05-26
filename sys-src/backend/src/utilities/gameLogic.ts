import Plant from "../models/plantModel";


const initializeGameBoard = (rows:number,cols:number)=>{
    const gameBoard: Plant[][] = [];
    
    for(let i = 0; i<rows ;i++){
        const row: Plant[] = [];
        for(let j = 0; j<cols ;j++){
            row.push({length:0, type:'empty'});
        }
        gameBoard.push(row);
    }
    console.log(gameBoard);
    return gameBoard;
}

//TODO: updategameBoard

export default initializeGameBoard;