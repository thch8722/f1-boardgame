import {GameDriver, Phase} from "../logic/types";
import {getChampionshipPoints} from "../logic/carLogic";
import {setUpCar} from "../logic/setUpHelper";
import {testLog} from "../../helpers";


export const phaseRun = (phase: Phase, raceStandings: GameDriver[]): GameDriver[] => {

    const updatedRaceStandings: GameDriver[] = [];
    if (phase.type === "BUILDUP") {
        const standingsAfterBuildUp = runBuildUp(phase, raceStandings);
        return standingsAfterBuildUp;
    } else if (phase.type === "SETUP") {
        const standingsAfterSetup = runSetUp(phase, raceStandings);
    }
    // Show standings
    // draw race card
    // TODO - if race card says so rollTrackCondition()
    // for each driver from top to bottom:
    // draw eventCard
    // drive phase distance
    // overtake
    return updatedRaceStandings;
}

export const runBuildUp = (phase: Phase, raceStandings: GameDriver[]): GameDriver[] => {
    testLog("------- Build up phase -------");
    testLog("Championship standings:");
    let position = 0;
    for (const driver of raceStandings) {
        testLog((++position) + " " + driver.name + " (" + driver.carNumber + ") " + driver.team + " " + getChampionshipPoints(driver) + "pts");
    }
    return raceStandings;
}

export const runSetUp = (phase: Phase, raceStandings: GameDriver[]) => {
    testLog("------- Setup phase -------");
    for (const driver of raceStandings) {
        setUpCar(driver, ["handling", "rain", "reliability"]);
    }
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