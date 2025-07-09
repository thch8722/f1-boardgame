import {CarInstance, GameDriver} from "./types";


export const getCar = (driver: GameDriver): CarInstance => {
    return driver.car;
}