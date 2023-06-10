


class Plant {

     length: number;
     plantTiles: PlantTile[] = [];


    constructor(length: number, plantTiles: PlantTile[]) {

        this.length = length;
        this.plantTiles = plantTiles;
    }


    public splashPlantTile(position: Vector2){

        const plantTile = this.plantTiles.find(plantTile => plantTile.position.x === position.x && plantTile.position.y === position.y);
        if(plantTile){
            plantTile.isSplashed = true;
        }
    }

    public  isAllPlantTilesSplashed(){
        return this.plantTiles.every(plantTile => plantTile.isSplashed);
    }

    public getPlantTile(position: Vector2){
        return this.plantTiles.find(plantTile => plantTile.position.x === position.x && plantTile.position.y === position.y);
    }

}