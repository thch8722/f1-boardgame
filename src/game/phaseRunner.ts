import {GameDriver, GameTeam, Phase, Session} from "../logic/types";
import {getChampionshipPoints} from "../logic/carLogic";
import {setUpCar} from "../logic/setUpHelper";
import {io} from "../io/terminal/io";
import {GameState} from "./gameState";
import {driveQualificationLap, sortRaceStandings} from "../logic/raceLogic";
import {getTeamById} from "./gameHelpers";


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
    const qualifyingSession: Session = {
        trackId: gameState.currentTrack.id,
        type: "qualifying",
        laps: {},
    };

    const phaseOrder: GameDriver[] = [];

    for (const driver of gameState.raceStandings) {
        const lap = driveQualificationLap(driver, gameState, { risk: 0, flow: 0 });

        if (!lap.driverId) lap.driverId = driver.id;

        if (!qualifyingSession.laps[driver.id]) {
            qualifyingSession.laps[driver.id] = [];
        }
        qualifyingSession.laps[driver.id].push(lap);

        driver.latestLap = lap;

        phaseOrder.push(driver);
    }

    // Use your dedicated sort function here
    const sortedPhaseOrder = sortRaceStandings(phaseOrder);

    gameState.raceStandings = sortedPhaseOrder;

    // Optionally store qualifyingSession in gameState
    // gameState.currentSession = qualifyingSession;
    io.print(formatGridTwoColumns(gameState.raceStandings, gameState));
    return gameState;
};

// grid output:
const truncate = (text: string | undefined, maxLength: number): string => {
    if (!text) return ""; // If undefined or empty
    return text.length > maxLength ? text.slice(0, maxLength - 3) + "..." : text;
};

export const formatGridTwoColumns = (raceStandings: GameDriver[], gameState: GameState): string => {
    const formatDriver = (pos: number, driver?: GameDriver): string => {
        if (!driver) return "";

        const lapTimeStr = driver.latestLap?.lapTime ?? "N/A";
        const name = driver.name;
        const team = truncate(getTeamById(driver.team, gameState.teams)?.name, 20);

        return `${pos.toString().padEnd(3, " ")})  ${name}\n    ${lapTimeStr}\n    ${team}`;
    };

    let output = "";
    for (let i = 0; i < raceStandings.length; i += 2) {
        const left = formatDriver(i + 1, raceStandings[i]);
        const right = formatDriver(i + 2, raceStandings[i + 1]);

        // Align the right column with some padding (16 spaces here)
        const rightLines = right ? right.split("\n") : [];
        const leftLines = left.split("\n");

        // Max 3 lines per driver block
        for (let lineIndex = 0; lineIndex < 3; lineIndex++) {
            const leftLine = leftLines[lineIndex] || "";
            const rightLine = rightLines[lineIndex] || "";

            // Pad left to 30 chars for alignment
            output += leftLine.padEnd(30, " ") + rightLine + "\n";
        }
    }

    return output;
};



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