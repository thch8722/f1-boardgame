import {AttributeModifier, CarInstance, GameDriver, SetupFocus} from "./types";
import {rollDice} from "./rollLogic";
import {testLog} from "../game/game.test";


export const setUpCar = (driver: GameDriver,
                         setupFocuses: SetupFocus[]) => {



    testLog("Driver " + driver.name + " setting up");
    const roll = rollDice();
    // testLog("Dice roll : " + roll);
    const driverMod = driver.attributes.mechanicalFeel;
    const carMod = driver.car.baseCar.attributes.setupEase;
    // testLog("Driver mod : " + driverMod);
    // testLog("Car mod : " + carMod);
    testLog("Total : " + (carMod + driverMod + roll));

    const attributeModifier: AttributeModifier = {
        source: "setup",
        mod: {

        },
        // condition ... maybe
        // description maybe
    }

    // convert total into setup points
    const setupBonusDistribution = distributeSetupBonus(carMod + driverMod + roll);
    for (let i = 0; i < setupBonusDistribution.length; i++) {
        const setupFocus = setupFocuses[i];
        const bonus = setupBonusDistribution[i];

        switch (setupFocus) {

            case "topSpeed":
                attributeModifier.mod.speed = bonus;
                break;
            case "handling":
                attributeModifier.mod.handling = bonus;
                break;
            case "reliability":
                break;
            case "qualification":
                // TODO:
                break; // or create a separate qualBoost field
            case "lateSprint":
                // TODO
                break; // or maybe tireWear or fuelEfficiency?
            case "wheelToWheel":
                // TODO
                break; // or overtaking potential
            case "rain":
                const rainModifier: AttributeModifier = {
                    source: "setup",
                    mod: { handling: bonus +1 },
                    condition: "wet",
                    description: "Rain setup bonus improves wet handling",
                };
                break; // define as needed
        }
    }

}

export const distributeSetupBonus = (total:number): number[] => {
    if (total >= 21) return [2, 1, 1];
    if (total >= 18) return [2, 1, 0];
    if (total >= 15) return [1, 1, 0];
    if (total >= 12) return [1, 0, 0];
    if (total <= 11) return [0, 0, 0];
    return [0, 0, 0];
}