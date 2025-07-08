import {GameDriver, Phase} from "../logic/types";


export const phaseRun = (phase: Phase, raceStandings: GameDriver[]): GameDriver[] => {

    const updatedRaceStandings: GameDriver[] = [];
    // Show standings
    // draw race card
    // for each driver from top to bottom:
    // draw eventCard
    // drive phase distance
    // overtake
    return updatedRaceStandings;
}

export const runBuildUp = () => {}

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