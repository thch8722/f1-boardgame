import {AttributeModifierCondition, TrackCondition, TrackConditionChances} from "./types";
import {CURRENT_DICE_METHOD, DEBUG} from "../game/constants";
import {GameState} from "../game/gameState";

const rollD12 = (): number => {
    return Math.floor(Math.random() * 12) + 1;
};

const roll2D6 = (): number => {
    const die1 = Math.floor(Math.random() * 6) + 1;
    const die2 = Math.floor(Math.random() * 6) + 1;
    return die1 + die2;
};

export const rollDice = (): number => {
    if (DEBUG) {
        return 12;
    }
    switch (CURRENT_DICE_METHOD) {
        case "d12": return rollD12();
        case "2d6": return roll2D6();
    }
}

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
    gameState: GameState
): boolean {
    if (Array.isArray(modifierCondition)) {
        return modifierCondition.every(cond => checkCondition(cond, gameState));
    } else {
        return checkCondition(modifierCondition, gameState);
    }
}


function checkCondition(cond: AttributeModifierCondition, gameState: GameState): boolean {
    switch (cond) {
        case "qualification":
            return gameState.currentPhase?.type === "QUALIFICATION";
        case "wet":
            return gameState.currentCondition === "wet";
        case "finalLaps":
            return gameState.currentPhase?.type === "FINAL";
        // add more when you need them
        default:
            return false;
    }
}
