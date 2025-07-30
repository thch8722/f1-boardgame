import {
    AttributeModifier,
    AttributeModifierCondition,
    ComponentHPModifier,
    GameDriver,
    SetupFocus,
    TrackModifierCondition
} from "./types";
import {evaluateThresholds, getAttributeMod, rollDice, ThresholdResult} from "./rollLogic";
import {getCarAttributeMod} from "./carLogic";
import {getDriverAttributeMod} from "./driverLogic";
import {io} from "../io/terminal/io";





export const mapSetupFocusToCondition: Record<SetupFocus, AttributeModifierCondition | undefined> = {
    topSpeed: undefined,
    handling: undefined,
    reliability: undefined,
    qualification: "qualification",
    lateSprint: "finalLaps",
    wheelToWheel: "wheelToWheel",
    rain: "wet",
};


export const setUpCar = (
    driver: GameDriver,
    setupFocuses: SetupFocus[],
    flow: boolean = false,
    risk: boolean = false
) => {

    const roll = rollDice();
    const driverMod = getDriverAttributeMod(driver, "mechanicalFeel");
    const carMod = getAttributeMod(driver.car.baseCar.setupEase ?? 0);
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
                        handling: bonus > 1 ? -1 : 0,
                    },
                });
                break;

            case "handling":
                newModifiers.push({
                    source: "setup",
                    mod: {
                        handling: bonus,
                        speed: bonus > 1 ? -1 : 0,
                    },
                });
                break;

            case "reliability":
                // your reliability code...
                break;

            default: {
                // ✅ NEW: use your mapping
                const condition = mapSetupFocusToCondition[setupFocus];
                if (!condition) throw new Error(`Missing condition mapping for ${setupFocus}`);

                const mod: AttributeModifier = {
                    source: "setup",
                    mod:
                        setupFocus === "rain"
                            ? { handling: bonus } // your special rain logic
                            : { speed: bonus },   // for other focuses
                    condition: condition,
                    description: `${setupFocus} setup boost`,
                };

                newModifiers.push(mod);
                break;
            }
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
