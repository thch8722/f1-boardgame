import {
    CarInstance,
    CarAttribute,
    CarComponent,
    GameDriver,
    CarTemplate,
    AttributeModifierCondition,
    ComponentToAttributeMap
} from "./types";
import {getAttributeMod, isConditionMet} from "./rollLogic";
import {io} from "../io/terminal/io";
import {MAX_HP} from "../game/constants";


export function getCurrentComponents(car: CarInstance): Record<CarComponent, number> {
    return car.components;
}

export function getChampionshipPoints(driver: GameDriver) {
    return driver.championshipPoints || 0;
}


/*
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

 */

export const getCarAttributeMod = (
    car: CarInstance,
    attr: CarAttribute | CarAttribute[],
    context: AttributeModifierCondition[] = []
): number => {
    const attrs = Array.isArray(attr) ? attr : [attr];
    let modSum = 0;

    for (const attribute of attrs) {
        // Normalize base attribute to -3..+3
        const base = getAttributeMod(car.baseCar.attributes[attribute]);

        let mods = 0;
        for (const m of car.modifiers) {
            if (m.mod[attribute] !== undefined) {
                if (!m.condition || isConditionMet(m.condition, context)) {
                    // Modifier is a relative value, so add as is (no getAttributeMod)
                    mods += m.mod[attribute]!;
                }
            }
        }

        // broken components here:
        let componentPenalty = 0;

        for (const [component, hp] of Object.entries(car.components) as [CarComponent, number][]) {
            const mappedAttribute = ComponentToAttributeMap[component];
            if (mappedAttribute === attribute) {
                const { perfPenalty } = getComponentPerformancePenalty(hp);
                componentPenalty += perfPenalty;
            }
        }

        modSum += base + mods + componentPenalty;
    }

    return modSum;
};

function getComponentPerformancePenalty(hp: number): { perfPenalty: number, riskBonus: number, depleted: boolean } {
    if (hp <= 0) {
        return { perfPenalty: -99, riskBonus: 0, depleted: true }; // big penalty means DNF risk
    }
    if (hp === 1) {
        return { perfPenalty: -1, riskBonus: 1, depleted: false };
    }
    if (hp <= MAX_HP / 2) {
        return { perfPenalty: -1, riskBonus: 0, depleted: false };
    }
    return { perfPenalty: 0, riskBonus: 0, depleted: false };
}



const clampMin = (value: number, min: number = 1): number => Math.max(value, min);