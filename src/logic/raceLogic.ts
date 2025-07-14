import {CarInstance, GameDriver, Lap, Track} from "./types";
import {GameState} from "../game/gameState";
import {getCarAttributeMod} from "./carLogic";
import {rollDice} from "./rollLogic";
import {io} from "../io/terminal/io";
import {getDriverAttributeMod} from "./driverLogic";


export const driveQualificationLap = (
    driver: GameDriver,
    gameState: GameState,
    options: { risk: number, flow: number }
): Lap => {
    const carScore = getCarQualificationScore(driver.car, gameState.currentTrack);
    const driverScore = getDriverQualificationScore(driver);
    const pace = carScore + driverScore;
    const flowPace = pace + options.flow;

    const hasIncident: boolean = isRiskIncident(options.risk, driver, gameState);
    const flowRiskPace = flowPace + options.risk;

    const roll = rollDice();


    const rollTotal = flowRiskPace + roll;

    const lap: Lap = {
        rollTotal,
        pace: pace,
        roll: roll,
        risk: options.risk,
        flow: options.flow,
        driverId: driver.id,
        hasIncident: hasIncident
    }

    lap.lapTime = calculateAndFormatLapTime(lap,gameState.currentTrack);
    io.print("LAP: " + JSON.stringify(lap));
    return lap;
};

const isRiskIncident = (risk: number, driver: GameDriver, gameState: GameState) => {
    // TODO:
    // hallelujah, full speed ahead, no risk!
    return false;
}


export const getCarQualificationScore = (car: CarInstance, track: Track) => {
    const speedMod = getCarAttributeMod(car, "speed");
    const handlingMod = getCarAttributeMod(car, "handling");

    // is track biased for speed or technicality / handling?
    const { speedBias, technicality } = track.attributes;
    return speedMod * speedBias + handlingMod * technicality;
};

export const getDriverQualificationScore = (driver: GameDriver) => {
    const speed = getDriverAttributeMod(driver, "speed");
    const focus = getDriverAttributeMod(driver, "focus");
    return speed * 2 + focus * 1; // if you want focus to matter less
};

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