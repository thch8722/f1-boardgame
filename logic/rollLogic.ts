

// main dices:
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