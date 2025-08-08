import {
    CarInstance,
    CarAttribute,
    CarComponent,
    GameDriver,
    CarTemplate,
    AttributeModifierCondition,
    ComponentToAttributeMap, ComponentCondition
} from "./types";
import {getAttributeMod, isConditionMet} from "./rollLogic";
import {io} from "../io/terminal/io";
import {MAX_HP} from "../game/constants";
import {GameState} from "../game/gameState";
import {tyreSelectionLoop} from "../inputLoops/tyreSelectionLoop";


export function getCurrentComponents(car: CarInstance): Record<CarComponent, number> {
    return car.components;
}

export function getChampionshipPoints(driver: GameDriver) {
    return driver.championshipPoints || 0;
}

// getCarAttributeMod (instrumented — add only for debugging)
export const getCarAttributeMod = (
    car: CarInstance,
    attr: CarAttribute | CarAttribute[],
    gameState: GameState
): number => {
    const attrs = Array.isArray(attr) ? attr : [attr];
    let modSum = 0;

    for (const attribute of attrs) {
        const base = getAttributeMod(car.baseCar.attributes[attribute]);

        let mods = 0;
        for (const m of car.modifiers) {
            if (m.mod[attribute] !== undefined) {
                if (!m.condition || isConditionMet(m.condition, gameState)) {
                    mods += m.mod[attribute]!;
                }
            }
        }

        let componentPenalty = 0;
        // Debug: show car.components and baseCar.components at start of attribute
        io.debug(`getCarAttributeMod start attribute=${attribute} base=${base} car.components=${JSON.stringify(car.components)} baseCar.components=${JSON.stringify(car.baseCar.components)}`);

        for (const [component, hp] of Object.entries(car.components) as [CarComponent, number][]) {
            const mappedAttribute = ComponentToAttributeMap[component];
            if (mappedAttribute === attribute) {
                // DEBUG: raw values
                const baseMax = car.baseCar && car.baseCar.components ? car.baseCar.components[component] : undefined;
                io.debug(`  -> component=${component} currentHp=${hp} baseMax=${baseMax}`);

                // Call your existing penalty function and log its output.
                // If your function signature differs (e.g., expects component name + base), adjust call accordingly.
                // const { perfPenalty } = getComponentPerformancePenalty(hp);
                const { perfPenalty } = getComponentPerformancePenalty(component, hp, baseMax || 0);

                io.debug(`     perfPenalty (from function) = ${perfPenalty}`);

                // Track intermediate
                componentPenalty += perfPenalty;
            }
        }

        io.debug(`  attribute=${attribute} -> base=${base} mods=${mods} componentPenalty=${componentPenalty}`);
        const total = base + mods + componentPenalty;
        io.debug(`  total before clamp/sum = ${total}`);
        // (Do not clamp here during debug — we just want to inspect values)
        modSum += total;
    }

    io.debug(`getCarAttributeMod result = ${modSum}`);
    return modSum;
};

export const getComponentPerformancePenalty = (
    componentName: CarComponent,
    currentHp: number,
    initialHp: number
): { perfPenalty: number; status: ComponentCondition; extraRisk: number } => {
    const safeHp = Math.max(0, Math.min(currentHp, initialHp));
    const halfThreshold = Math.floor(initialHp / 2);

    let status: ComponentCondition;
    let perfPenalty = 0;
    let extraRisk = 0;

    if (safeHp === 0) {
        status = "depleted";
    } else if (safeHp === 1) {
        status = "critical";
        perfPenalty = -1;
        extraRisk = 1;
    } else if (safeHp <= halfThreshold) {
        status = "worn";
        perfPenalty = -1.0;
        extraRisk = 0;
    } else {
        status = "brandNew";
        perfPenalty = 0;
        extraRisk = 0;
    }

    io.debug(
        `getComponentPerformancePenalty ${componentName} hp=${safeHp}/${initialHp} status=${status} perfPenalty=${perfPenalty} extraRisk=${extraRisk}`
    );

    return { perfPenalty, status, extraRisk };
};



export const fitCarWithTyres = async (driver: GameDriver, gameState: GameState) => {
    if (driver.isNPC) {
        if (gameState.currentCondition === "wet") {
            driver.car.tireType = "wet";
        } else {
            driver.car.tireType = "dry";
        }
    } else {
        const tireType = await tyreSelectionLoop();
        driver.car.tireType = tireType;
    }
}

const clampMin = (value: number, min: number = 1): number => Math.max(value, min);