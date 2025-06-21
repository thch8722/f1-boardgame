

export const DICE_METHODS = {
    D12: 'd12',
    TWO_D6: '2d6',
} as const;

export type DiceMethod = typeof DICE_METHODS[keyof typeof DICE_METHODS];

// Set the actual method in use here:
export const CURRENT_DICE_METHOD: DiceMethod = DICE_METHODS.TWO_D6;