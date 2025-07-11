import {CarInstance, CarAttribute, CarComponent, GameDriver, CarTemplate, AttributeModifierCondition} from "./types";
import {getAttributeMod, isConditionMet} from "./rollLogic";


export function getCurrentComponents(car: CarInstance): Record<CarComponent, number> {
    return car.components;
}

export function getChampionshipPoints(driver: GameDriver) {
    return driver.championshipPoints || 0;
}

// attributes AS THEY ARE NOW. Define the attributes U want to include in mod, define context/conditions
export const getCarAttributeMod = (
    car: CarInstance,
    attr: CarAttribute | CarAttribute[],
    context: AttributeModifierCondition[] = []
): number => {
    const attrs = Array.isArray(attr) ? attr : [attr];
    let modSum = 0;

    for (const attribute of attrs) {
        const base = getAttributeMod(car.baseCar.attributes[attribute]);
        let mods = 0;

        for (const m of car.modifiers) {
            if (m.mod[attribute] !== undefined) {
                if (!m.condition || isConditionMet(m.condition, context)) {
                    mods += getAttributeMod(m.mod[attribute]!);
                }
            }
        }

        modSum += base + mods;
    }

    return modSum;
};


const clampMin = (value: number, min: number = 1): number => Math.max(value, min);