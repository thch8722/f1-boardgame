import {AttributeModifier, ComponentHPModifier, GameDriver, SetupFocus} from "./types";
import {evaluateThresholds, rollDice, ThresholdResult} from "./rollLogic";
import {getCarAttributeMod} from "./carLogic";
import {getDriverAttributeMod} from "./driverLogic";
import {io} from "../io/terminal/io";





/*
export const setUpCar = (
    driver: GameDriver,
    setupFocuses: SetupFocus[],
    flow: boolean = false,
    risk: boolean = false) => {



    testLog("Driver " + driver.name + " setting up");
    const roll = rollDice();
    const driverMod = getDriverAttributeMod(driver, "mechanicalFeel");
    const carMod = getCarAttributeMod(driver.car, "setupEase");
    let rollTotal = roll + driverMod + carMod;

    if (flow) rollTotal += 1;
    if (risk) rollTotal += 1;

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
                // todo add modifier:
                break; // define as needed
        }
    }

}

 */
export const setUpCar = (
    driver: GameDriver,
    setupFocuses: SetupFocus[],
    flow: boolean = false,
    risk: boolean = false
) => {

    const roll = rollDice();
    const driverMod = getDriverAttributeMod(driver, "mechanicalFeel");
    const carMod = getCarAttributeMod(driver.car, "setupEase");
    let rollTotal = roll + driverMod + carMod;

    if (flow) rollTotal += 1;
    if (risk) rollTotal += 1;
    io.print(driver.name + " setting up : " + rollTotal);

    // collect all new modifiers here:
    const newModifiers: AttributeModifier[] = [];
    const newComponentMods: ComponentHPModifier[] = [];

    // convert total into setup points
    const setupBonusDistribution = distributeSetupBonus(rollTotal);

    for (let i = 0; i < setupBonusDistribution.length; i++) {
        const setupFocus = setupFocuses[i];
        const bonus = setupBonusDistribution[i];

        switch (setupFocus) {
            case "topSpeed":
                newModifiers.push({
                    source: "setup",
                    mod: {
                        speed: bonus,
                        handling: bonus > 1 ? -1: 0     // very good speed boost comes with a tradeoff
                    },
                });
                break;

            case "handling":
                newModifiers.push({
                    source: "setup",
                    mod: {
                        handling: bonus,
                        speed: bonus > 1 ? -1: 0
                    },
                });
                break;

            case "reliability": {
                const numberOfComponentHPs = bonus + 1;
                const compHPMod: ComponentHPModifier = {
                    source: "setup",
                    mod: {},
                };
                for (let i = numberOfComponentHPs - 1; i > -1; i--) {
                    const random = Math.floor(Math.random() * 4);
                    if (random === 0) {
                        compHPMod.mod.brakes = (compHPMod.mod.brakes ?? 0) + 1;
                    } else if (random === 1) {
                        compHPMod.mod.gearbox = (compHPMod.mod.gearbox ?? 0) + 1;
                    } else if (random === 2) {
                        compHPMod.mod.engine = (compHPMod.mod.engine ?? 0) + 1;
                    } else if (random === 3) {
                        compHPMod.mod.tyres = (compHPMod.mod.tyres ?? 0) + 1;
                    }
                }
                newComponentMods.push(compHPMod);
                break;
            }

            case "qualification":
                newModifiers.push({
                    source: "setup",
                    mod: { speed: bonus },
                    condition: "qualification",
                    description: "Qualification setup boost",
                });
                break;

            case "lateSprint":
                newModifiers.push({
                    source: "setup",
                    mod: { speed: bonus },
                    condition: "finalLaps",
                    description: "Late sprint setup boost",
                });
                break;

            case "wheelToWheel":
                newModifiers.push({
                    source: "setup",
                    mod: { handling: bonus },
                    condition: "wheelToWheel",
                    description: "Wheel to wheel setup boost",
                });
                break;

            case "rain":
                newModifiers.push({
                    source: "setup",
                    mod: { handling: bonus },
                    condition: "wet",
                    description: "Rain setup boost",
                });
                break;
        }
    }

    // ✅ ACTUALLY add all modifiers to the car:
    driver.car.modifiers.push(...newModifiers);
    driver.car.componentHPModifiers.push(...newComponentMods);



    // test output
    io.debug(`Applied ${newModifiers.length} car mods:`);

    for (const mod of newModifiers) {
        io.debug(
            `  - Source: ${mod.source}` +
            (mod.condition ? ` [Condition: ${mod.condition}]` : ``)
        );
        for (const [key, value] of Object.entries(mod.mod)) {
            io.debug(`    → ${key}: +${value}`);
        }
    }

    io.debug(`Applied ${newComponentMods.length} component mods:`);

    for (const mod of newComponentMods) {
        io.debug(`  - Source: ${mod.source}`);
        for (const [key, value] of Object.entries(mod.mod)) {
            io.debug(`    → ${key}: +${value} HP`);
        }
    }

};


export const setupThresholds: ThresholdResult<number[]>[] = [
    { threshold: 16, result: [2, 1, 1] },
    { threshold: 13, result: [2, 1, 0] },
    { threshold: 10, result: [1, 1, 0] },
    { threshold: 7, result: [1, 0, 0] },
];

export const distributeSetupBonus = (total: number): number[] =>
    evaluateThresholds(total, setupThresholds, [0, 0, 0]);
