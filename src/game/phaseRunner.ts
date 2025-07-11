import {GameDriver, Phase} from "../logic/types";
import {getChampionshipPoints} from "../logic/carLogic";
import {setUpCar} from "../logic/setUpHelper";
import {io} from "../io/terminal/io";
import {GameState} from "./gameState";
import {driveQualificationLap} from "../logic/raceLogic";


export const phaseRunner = (phase: Phase, gameState: GameState): GameState => {
    io.print("-------" + phase.name + "-------");
    const updatedRaceStandings: GameDriver[] = [];
    if (phase.type === "BUILDUP") {
        const standingsAfterBuildUp = runBuildUp(phase, gameState);
        return standingsAfterBuildUp;
    } else if (phase.type === "SETUP") {
        const standingsAfterSetup = runSetUp(phase, gameState);
        return standingsAfterSetup;
    } else if (phase.type === "QUALIFICATION") {
        const standingsAfterQualification = runQualification(phase, gameState);
        return standingsAfterQualification;
    }
    // Show standings
    // draw race card
    // TODO - if race card says so rollTrackCondition()
    // for each driver from top to bottom:
    // draw eventCard
    // drive phase distance
    // overtake
    return gameState;
}

export const runBuildUp = (phase: Phase, gameState: GameState): GameState => {
    io.print("Championship standings:");
    let position = 0;
    for (const driver of gameState.raceStandings) {
        io.print((++position) + " " + driver.name + " (" + driver.carNumber + ") " + driver.team + " " + getChampionshipPoints(driver) + "pts");
    }
    return gameState;
}

export const runSetUp = (phase: Phase, gameState: GameState): GameState => {
    for (const driver of gameState.raceStandings) {
        // TODO add tracks and cards and so on
        setUpCar(driver, ["topSpeed", "rain", "reliability"]);
    }
    return gameState;
}

export const runQualification = (phase: Phase, gameState: GameState): GameState => {
    for (const driver of gameState.raceStandings) {
        // TODO add track here
        driveQualificationLap(driver, gameState);
    }
    return gameState;
}

/*

Qualification: “Boosts your car’s power and handling for fast laps in qualifying.”

Wet: “Improves car handling in rainy conditions.”

Final Laps: “Optimizes car for lower fuel load and driver focus in final race laps.”

Overtake/Defend: “Improves handling during overtaking and defending battles.”

 */
export const runSetup = () => {}

export const drawEventCard = () => {}

export const drivePhaseDistance = () => {}

export const overtakeAttempt = () => {}

export const checkRisk = () => {}

export const resolveIncident = () => {}