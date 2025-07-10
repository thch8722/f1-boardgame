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
    attr: DriverAttribute
): number => {
    return getAttributeMod(driver.attributes[attr]);
};