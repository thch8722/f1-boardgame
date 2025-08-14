

export const DICE_METHODS = {
    D12: 'd12',
    TWO_D6: '2d6',
} as const;

export type DiceMethod = typeof DICE_METHODS[keyof typeof DICE_METHODS];

// Set the actual method in use here:
export const CURRENT_DICE_METHOD: DiceMethod = DICE_METHODS.TWO_D6;

export const DEBUG = true;
export const MAX_HP = 7;

export const START_GRID_GROUPING = 5;   // five cars start on same totaldistance