import {DriverAttribute, GameDriver} from "./types";
import {getAttributeMod} from "./rollLogic";

/*
function hydrateDriver(raw: DriverRaw, carsById: Record<string, CarInstance>): Driver {
    return {
        ...raw,
        car: carsById[raw.car], // replace string ID with actual car object
    };
}

 */

export const getDriverAttributeMod = (
    driver: GameDriver,
    attrs: DriverAttribute | DriverAttribute[]
): number => {
    const attributes = Array.isArray(attrs) ? attrs : [attrs];
    let modSum = 0;

    for (const attr of attributes) {
        modSum += getAttributeMod(driver.attributes[attr]);
    }

    return modSum;
};
