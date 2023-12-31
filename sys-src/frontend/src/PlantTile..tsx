import {Vector2} from "./Vector2";

export class PlantTile{

    public position: Vector2;
    public isSplashed: boolean;

    constructor(position: Vector2, isSplashed: boolean){
        this.position = position;
        this.isSplashed = isSplashed;
    }

}