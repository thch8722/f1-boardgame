import {OvertakingZone, Track, TrackCondition, TrackConditionChances, TrackModifier} from "./types";
import {GameState} from "../game/gameState";
import {io} from "../io/terminal/io";


export const getTrackConditionChances = (track: Track): TrackConditionChances => ({
    rain: track.attributes.rainChance,
    dry: track.attributes.dryChance,
    intermediate: track.attributes.intermediateChance || 0,
    heat: track.attributes.hotChance,
    cold: track.attributes.coldChance,
    dust: track.attributes.dustyChance,
});


export const rollTrackCondition = (track: Track): TrackCondition => {

    const chances: TrackConditionChances = getTrackConditionChances(track);

    const roll = Math.floor(Math.random() * 100) + 1;
    let sum = 0;

    if ((sum += chances.rain) >= roll) return "wet";
    if ((sum += chances.intermediate) > roll) return "intermediate";
    if ((sum += chances.dry) >= roll) return "dry";
    if ((sum += chances.heat) >= roll) return "hot";
    if ((sum += chances.cold) >= roll) return "cold";
    if ((sum += chances.dust) >= roll) return "dust";

    // fallback, shouldn't happen if chances add up to 100
    throw new Error("Invalid TrackConditionChances: total does not sum to 100");
};

export const createTrackModifiersForCondition = (condition: TrackCondition): TrackModifier[] => {
    switch (condition) {
        case "wet":
            return [{
                condition: "wet",
                mod: { handling: -2, speed: -1 },
                riskMod: 2,
                description: "Reduced handling and speed due to rain"
            }];
        case "intermediate":
            return [{
                condition: "intermediate",
                mod: { handling: -1 },
                riskMod: 1,
                description: "Mixed conditions reduce grip slightly"
            }];
        case "hot":
            return [{
                condition: "hotWeather",
                mod: { handling: 1 },
                riskMod: 1,
                description: "Better handling and Overheating"
            }];
        // Add other cases...

        default:        // dry is default:
            return [];
    }
};

export function closeRandomOvertakingZone(gameState: GameState): OvertakingZone | null {
    const openZones = gameState.currentTrack.overtakingZones;
    if (openZones.length === 0) {
        io.print(`No overtaking zones available to close.`);
        return null;
    }

    const randomIndex = Math.floor(Math.random() * openZones.length);
    const zoneToClose = openZones[randomIndex];

    io.print(`Overtaking zone closed for this phase: ${zoneToClose.name}`);

    // This function should **not** mutate GameState directly anymore.
    // Instead, the caller sets the phaseEffect:
    return zoneToClose;
}

export const getPhaseEffectLapTimeMod = (gameState: GameState): number => {
    const effect = gameState.phaseEffect;
    io.debug(`EFFECT CHECK: ${JSON.stringify(effect)}`);

    if (!effect) return 0;

    io.debug(`HAS KEYS: ${Object.keys(effect)}`);

    if ("lapTimeMod" in effect) {
        io.debug(`lapTimeMod IS: ${effect.lapTimeMod}`);
    }

    if ("lapTimeMod" in effect && typeof effect.lapTimeMod === "number") {
        return effect.lapTimeMod;
    }

    return 0;
};

// for yellow flags. faster cars must slowdown  more than faster cars:
export const getPaceFactored = (pace: number, gameState: GameState) => {
    const phaseEffect = gameState.phaseEffect;

    if (phaseEffect?.type === "yellowFlag") {
        return Math.floor((phaseEffect.paceFactor ?? 1) * pace);
    }
    return pace;
}


