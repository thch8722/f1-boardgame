import {AttributeModifierCondition, TrackCondition, TrackConditionChances} from "../logic/types";
import {CURRENT_DICE_METHOD} from "../game/constants";

const rollD12 = (): number => {
    return Math.floor(Math.random() * 12) + 1;
};

const roll2D6 = (): number => {
    const die1 = Math.floor(Math.random() * 6) + 1;
    const die2 = Math.floor(Math.random() * 6) + 1;
    return die1 + die2;
};

export const rollDice = (): number => {
    switch (CURRENT_DICE_METHOD) {
        case "d12": return rollD12();
        case "2d6": return roll2D6();
    }
}

// TODO
export const rollTrackCondition = (chances: TrackConditionChances): TrackCondition => {
    const roll = Math.floor(Math.random() * 100) + 1;
    let sum = 0;

    if ((sum += chances.rain) >= roll) return "wet";
    if ((sum += chances.dry) >= roll) return "dry";
    if ((sum += chances.heat) >= roll) return "hot";
    if ((sum += chances.cold) >= roll) return "cold";
    if ((sum += chances.dust) >= roll) return "dust";

    // fallback, shouldn't happen if chances add up to 100
    throw new Error("Invalid TrackConditionChances: total does not sum to 100");
};

export const getAttributeMod = (value: number) => value - 4;

export type ThresholdResult<T> = {
    threshold: number;
    result: T;
};

export function evaluateThresholds<T>(
    total: number,
    thresholds: ThresholdResult<T>[],
    defaultResult: T
): T {
    for (const { threshold, result } of thresholds) {
        if (total >= threshold) {
            return result;
        }
    }
    return defaultResult;
}

export function isConditionMet(
    modifierCondition: AttributeModifierCondition | AttributeModifierCondition[],
    currentContext: AttributeModifierCondition[]
): boolean {
    if (Array.isArray(modifierCondition)) {
        // Check if all conditions are present in current context
        return modifierCondition.every(cond => currentContext.includes(cond));
    } else {
        // Single condition case
        return currentContext.includes(modifierCondition);
    }
}

