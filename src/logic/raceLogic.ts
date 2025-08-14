import {CarInstance, GameDriver, Lap, Track} from "./types";
import {GameState} from "../game/gameState";
import {getCarAttributeMod} from "./carLogic";
import {rollDice} from "./rollLogic";
import {io} from "../io/terminal/io";
import {getDriverAttributeMod} from "./driverLogic";
import {getPaceFactored, getPhaseEffectLapTimeMod} from "./trackLogic";


export const driveLap = (
    driver: GameDriver,
    gameState: GameState,
    options: { risk: number, flow: number }
): Lap => {
    io.debug(`Before lap - driver ${driver.name} tireType=${driver.car.tireType}`);

    const carScore = getCarLapScore(driver.car, gameState);
    const driverScore = getDriverLapScore(driver, gameState);
    const rawPace = carScore + driverScore;
    const pace = Math.max(0, rawPace);
    const paceFactored = getPaceFactored(pace, gameState);
    const flowPace = paceFactored + options.flow;
    const hasIncident: boolean = isRiskIncident(options.risk, driver, gameState);
    const flowRiskPace = flowPace + options.risk;
    const flowRiskPacePhaseEffectLapTimeMod = flowRiskPace + getPhaseEffectLapTimeMod(gameState);

    const roll = rollDice();

    const BASELINE_OFFSET = 30; // tune this number as needed

    let rollTotal = flowRiskPacePhaseEffectLapTimeMod + roll + BASELINE_OFFSET;

    const lap: Lap = {
        rollTotal,
        pace: pace,
        roll: roll,
        risk: options.risk,
        flow: options.flow,
        driverId: driver.id,
        hasIncident: hasIncident,

        paceFactored,
        flowPace,
        flowRiskPace,
        flowRiskPacePhaseEffectLapTimeMod,
        carScore,
        driverScore
    }

    io.debug(JSON.stringify(lap));

    lap.lapTime = calculateAndFormatLapTime(lap,gameState.currentTrack);
    io.debug("LAP: " + driver.name + " " + JSON.stringify(lap));
    return lap;
};

const isRiskIncident = (risk: number, driver: GameDriver, gameState: GameState) => {
    // TODO:
    // hallelujah, full speed ahead, no risk!
    return false;
}


export const getCarLapScore = (car: CarInstance, gameState: GameState) => {
    let speedMod = getCarAttributeMod(car, "speed", gameState);
    let handlingMod = getCarAttributeMod(car, "handling", gameState);
    const track = gameState.currentTrack;
    const { speedBias, technicality } = track.attributes;

    // Apply track modifiers (already includes rain penalties)
    if (track.modifiers) {
        for (const mod of track.modifiers) {
            speedMod += mod.mod.speed ?? 0;
            handlingMod += mod.mod.handling ?? 0;
        }
    }

    const condition = gameState.currentCondition;

    // Penalty only when tyre type doesn't match weather
    if (condition === "wet" && car.tireType === "dry") {
        handlingMod -= 2; // slicks on wet
    }
    if (condition === "dry" && car.tireType === "wet") {
        handlingMod -= 2; // wets on dry
    }

    const score = speedMod * speedBias + handlingMod * technicality;
    io.debug(`getCarLapScore tyre=${car.tireType} condition=${condition} => score=${score.toFixed(2)}`);
    return score;
};


export const getDriverLapScore = (driver: GameDriver, gameState: GameState) => {
    const speed = getDriverAttributeMod(driver, "speed");
    const focus = getDriverAttributeMod(driver, "focus");
    const bravery  = getDriverAttributeMod(driver, "bravery");
    const raceCraft = getDriverAttributeMod(driver, "racecraft");
    const rainSkill = getDriverAttributeMod(driver, "rainSkill");

    // Weather conditions take precedence over phase scoring
    if (gameState.currentCondition === "wet") {
        return useYourBestSkill(raceCraft, rainSkill, Math.ceil((focus + bravery) / 2));
    }

    if (gameState.currentCondition === "intermediate") {
        return useYourBestSkill(speed, raceCraft, Math.ceil((rainSkill + bravery) / 2));
    }

    const phaseType = gameState.currentPhase?.type;
    switch (phaseType) {
        case "QUALIFICATION":
        case "FINAL":
            return useYourBestSkill(speed, speed, focus);
        case "START":
            return useYourBestSkill(raceCraft, raceCraft, bravery);

        default:
            const focusBravery = Math.ceil((focus + bravery) / 2); // average, rounded down
            io.debug(`phaseType: ${phaseType} - treated as default`);
            return useYourBestSkill(speed, speed, focusBravery);
    }
};

export const useYourBestSkill = (skill1: number, skill2: number, skill3: number): number => {
    const sum = skill1 + skill2 + skill3;
    const best = Math.max(skill1, skill2, skill3);
    return sum + best;
}

// test function:
export const printCarBaseAttributes = (car: CarInstance) => {
    const speed = car.baseCar.attributes.speed;
    const handling = car.baseCar.attributes.handling;
    io.print("---------------------------");
    io.print(`Base Speed: ${speed}`);
    io.print(`Base Handling: ${handling}`);
};

/**
 * Calculate and format a single lap time.
 *
 * Logic:
 * 1. rollTotal: sets the main time chunk — higher roll means more time shaved off.
 * 2. pace: only adjusts milliseconds to simulate driver pace or form.
 * 3. Final time = baseLapTime - (roll effect) - (pace millis).
 *
 * @param lap - The lap data, including rollTotal and pace.
 * @param track - The track data, including base lap time and lap time factor.
 * @param paceFactor - How many milliseconds each pace point is worth (default 10 ms).
 * @returns Formatted lap time string in `m:ss.mmm`.
 */
export const calculateAndFormatLapTime = (
    lap: Lap,
    track: Track,
    paceFactor = 10 // each pace point worth 10 milliseconds
): string => {
    // Clamp rollTotal to prevent negative values from adding time instead of removing it
    // const effectiveRoll = Math.max(0, lap.rollTotal);
    // Prevent negative rollTotal from making lap time faster (which is illogical)
    const effectiveRoll = Math.max(0, lap.rollTotal);

    // Each roll point reduces the lap time by track-specific factor (bigger roll → faster)
    const timeReduction = effectiveRoll * track.lapTimeFactor;

    // Raw base lap time after roll effect
    const baseTime = track.baseLapTime - timeReduction;

    // Pace adjusts only milliseconds: positive pace = faster lap, negative = slower
    const millisAdjustment = lap.pace * paceFactor;

    // Final adjusted lap time in seconds
    const adjustedLapTime = baseTime - millisAdjustment / 1000;

    // Format: convert to minutes, seconds, milliseconds
    const minutes = Math.floor(adjustedLapTime / 60);
    const seconds = Math.floor(adjustedLapTime % 60);
    const milliseconds = Math.floor((adjustedLapTime % 1) * 1000);

    // Return as `m:ss.mmm`
    return `${minutes}:${seconds.toString().padStart(2, "0")}.${milliseconds
        .toString()
        .padStart(3, "0")}`;
};

export const sortRaceStandings = (drivers: GameDriver[]): GameDriver[] => {
    return [...drivers].sort((a, b) => {
        const distA = a.totalDistance ?? 0;
        const distB = b.totalDistance ?? 0;
        if (distB !== distA) {
            return distB - distA;
        }

        const rollA = a.latestLap?.rollTotal ?? 0;
        const rollB = b.latestLap?.rollTotal ?? 0;
        if (rollB !== rollA) {
            return rollB - rollA;
        }

        const paceA = a.latestLap?.pace ?? 0;
        const paceB = b.latestLap?.pace ?? 0;
        return paceB - paceA;
    });
};