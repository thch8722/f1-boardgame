import {CarInstance, Driver, DriverRaw, GameDriver} from "./types";


function hydrateDriver(raw: DriverRaw, carsById: Record<string, CarInstance>): Driver {
    return {
        ...raw,
        car: carsById[raw.car], // replace string ID with actual car object
    };
}