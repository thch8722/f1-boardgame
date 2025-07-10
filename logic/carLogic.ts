

import {CarInstance, CarAttribute, CarComponent, GameDriver, CarTemplate} from "./types";
import {getAttributeMod} from "./rollLogic";

export function getCurrentAttributes(car: CarInstance): Record<CarAttribute, number> {
    const base = car.baseCar.attributes;
    const totalMods = { speed: 0, handling: 0, setupEase: 0 };

    for (const mod of car.modifiers) {
        for (const key of Object.keys(mod.mod) as CarAttribute[]) {
            totalMods[key] += mod.mod[key] ?? 0;
        }
    }

    return {
        speed: clampMin(base.speed + totalMods.speed),
        handling: clampMin(base.handling + totalMods.handling),
        setupEase: clampMin(base.setupEase + totalMods.setupEase)
    };
}

export function getCurrentComponents(car: CarInstance): Record<CarComponent, number> {
    return car.components;
}

export function getChampionshipPoints(driver: GameDriver) {
    return driver.championshipPoints || 0;
}

export const getCarAttributeMod = (
    car: CarInstance,
    attr: CarAttribute
): number => {
    return getAttributeMod(car.baseCar.attributes[attr]);
};


const clampMin = (value: number, min: number = 1): number => Math.max(value, min);