import {CarInstance, GameDriver, Track} from "./types";
import {GameState} from "../game/gameState";
import {getCarAttributeMod} from "./carLogic";
import {rollDice} from "./rollLogic";
import {io} from "../io/terminal/io";
import {getDriverAttributeMod} from "./driverLogic";


export const driveQualificationLap = (driver: GameDriver, gameState: GameState) => {
    const carScore = getCarQualificationScore(driver.car, gameState.currentTrack);
    const driverScore = getDriverQualificationScore(driver);
    const pace = rollDice() + carScore + driverScore;
    io.print(driver.name + " pace: " + pace + ", driver score: " +driverScore + ", car score: " + carScore);
    return pace;
};

export const getCarQualificationScore = (car: CarInstance, track: Track) => {
    const speedMod = getCarAttributeMod(car, "speed");
    const handlingMod = getCarAttributeMod(car, "handling");

    // is track biased for speed or technicality / handling?
    const { speedBias, technicality } = track.attributes;
    return speedMod * speedBias + handlingMod * technicality;
};

export const getDriverQualificationScore = (driver: GameDriver) => {
    const speed = getDriverAttributeMod(driver, "speed");
    const focus = getDriverAttributeMod(driver, "focus");
    return speed * 2 + focus * 1; // if you want focus to matter less
};


// test function:
export const printCarBaseAttributes = (car: CarInstance) => {
    const speed = car.baseCar.attributes.speed;
    const handling = car.baseCar.attributes.handling;
    io.print("---------------------------");
    io.print(`Base Speed: ${speed}`);
    io.print(`Base Handling: ${handling}`);
};