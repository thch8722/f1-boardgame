import {CarInstance, GameDriver, SetupFocus} from "./types";
import {rollDice} from "./rollLogic";
import {testLog} from "../game/game.test";


export const setUpCar = (driver: GameDriver, setUpFocus: SetupFocus) => {

    if (typeof driver.car)

    testLog("Driver " + driver.name + " setting up");
    const roll = rollDice();
    testLog("Dice roll : " + roll);
    const driverMod = driver.attributes.mechanicalFeel;
    const carMod = car.baseCar.attributes.setupEase;
    testLog("Driver mod : " + driverMod);
    testLog("Car mod : " + carMod);
    testLog("Total : " + (carMod + driverMod + roll));
}