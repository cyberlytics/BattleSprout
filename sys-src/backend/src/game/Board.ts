import {Plant} from "./Plant";
import {Vector2} from "./Vector2";
import {SplashResult} from "./SplashResult";

export class Board {

    public plants: Plant[] = [];


    constructor() {

        this.plants = [];
    }

    public addPlant(plant: Plant) {

        this.plants.push(plant);
    }

    public splashTile(splash: Vector2): SplashResult {

        var hit = false;
        var sunk = false;

        const plant = this.plants.find(plant => plant.getPlantTile(splash));
        if(plant){
            plant.splashPlantTile(splash);
            hit = true;
            sunk = plant.isAllPlantTilesSplashed();
        }

        return new SplashResult(hit, sunk);

    }

    public isBoardEndState(): boolean {

        return this.plants.every(plant => plant.isAllPlantTilesSplashed());
    }
}