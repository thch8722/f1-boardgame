import {AttributeModifier, ComponentHPModifier, GameDriver, SetupFocus} from "./types";
import {evaluateThresholds, rollDice, ThresholdResult} from "./rollLogic";
import {testLog} from "../game/game.test";
import {getCarAttributeMod} from "./carLogic";
import {getDriverAttributeMod} from "./driverLogic";


export const setUpCar = (driver: GameDriver,
                         setupFocuses: SetupFocus[]) => {



    testLog("Driver " + driver.name + " setting up");
    const roll = rollDice();
    const driverMod = getDriverAttributeMod(driver, "mechanicalFeel");
    const carMod = getCarAttributeMod(driver.car, "setupEase");
    const rollTotal = roll + driverMod + carMod;

    testLog("Roll total " + rollTotal);

    const attributeModifier: AttributeModifier = {
        source: "setup",
        mod: {

        },
        // condition ... maybe
        // description maybe
    }

    // convert total into setup points
    const setupBonusDistribution = distributeSetupBonus(rollTotal);
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

                const numberOfComponentHPs = bonus + 1;
                const componentHPModifier: ComponentHPModifier = {
                    source: "setup",
                    mod: {
                        // set mods in for below
                    }
                }
                for (let i = numberOfComponentHPs - 1; i > -1; i--) {
                    // which component? :
                    const random = Math.floor(Math.random() * 4); // 4 IS NUMBER OF CAR COMPONENTS in type
                    if (random === 0) {
                        componentHPModifier.mod.brakes = (componentHPModifier.mod.brakes ?? 0) + 1;
                    } else if (random === 1) {
                        componentHPModifier.mod.gearbox = (componentHPModifier.mod.gearbox ?? 0) + 1;
                    } else if (random === 2) {
                        componentHPModifier.mod.engine = (componentHPModifier.mod.engine ?? 0) + 1;
                    } else if (random === 3) {
                        componentHPModifier.mod.tyres = (componentHPModifier.mod.tyres ?? 0) + 1;
                    }
                }



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

export const setupThresholds: ThresholdResult<number[]>[] = [
    { threshold: 16, result: [2, 1, 1] },
    { threshold: 13, result: [2, 1, 0] },
    { threshold: 10, result: [1, 1, 0] },
    { threshold: 7, result: [1, 0, 0] },
];

export const distributeSetupBonus = (total: number): number[] =>
    evaluateThresholds(total, setupThresholds, [0, 0, 0]);
/*
export const distributeSetupBonus = (total:number): number[] => {
    if (total >= 21) return [2, 1, 1];
    if (total >= 18) return [2, 1, 0];
    if (total >= 15) return [1, 1, 0];
    if (total >= 12) return [1, 0, 0];
    if (total <= 11) return [0, 0, 0];
    return [0, 0, 0];
}

 */