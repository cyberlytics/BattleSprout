import { Plant } from '../../game/Plant';
import {PlantTile} from "../../game/PlantTile";


describe('Plant class', () => {
    let plantTiles: PlantTile[];
    let plant: Plant;

    beforeEach(() => {
        plantTiles = [
            { position: { x: 0, y: 0 }, isSplashed: false },
            { position: { x: 1, y: 0 }, isSplashed: false },
            { position: { x: 0, y: 1 }, isSplashed: false },
            { position: { x: 1, y: 1 }, isSplashed: false }
        ];
        plant = new Plant(plantTiles);
    });

    test('splashPlantTile should mark the correct tile as splashed', () => {
        const positionToSplash = { x: 1, y: 1 };
        plant.splashPlantTile(positionToSplash);
        const splashedTile = plant.getPlantTile(positionToSplash);

        expect(splashedTile?.isSplashed).toBe(true);
    });

    test('splashPlantTile should not mark any tile if the position is not found', () => {
        const invalidPosition = { x: 100, y: 100 };
        plant.splashPlantTile(invalidPosition);

        const splashedTiles = plantTiles.filter(tile => tile.isSplashed);

        expect(splashedTiles.length).toBe(0);
    });

    test('isAllPlantTilesSplashed should return true if all tiles are splashed', () => {
        plantTiles.forEach(tile => {
            plant.splashPlantTile(tile.position);
        });

        expect(plant.isAllPlantTilesSplashed()).toBe(true);
    });

    test('isAllPlantTilesSplashed should return false if any tile is not splashed', () => {
        plant.splashPlantTile(plantTiles[0].position);

        expect(plant.isAllPlantTilesSplashed()).toBe(false);
    });

    test('getPlantTile should return the tile with the specified position', () => {
        const targetPosition = { x: 0, y: 1 };
        const retrievedTile = plant.getPlantTile(targetPosition);

        expect(retrievedTile).toEqual(plantTiles[2]);
    });

    test('getPlantTile should return undefined if no tile with the specified position is found', () => {
        const invalidPosition = { x: 100, y: 100 };
        const retrievedTile = plant.getPlantTile(invalidPosition);

        expect(retrievedTile).toBeUndefined();
    });
});