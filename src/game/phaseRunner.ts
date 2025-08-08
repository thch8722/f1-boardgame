import {GameDriver, GameTeam, Phase, Session, SetupFocus, TrackCondition, TrackModifier} from "../logic/types";
import {fitCarWithTyres, getChampionshipPoints} from "../logic/carLogic";
import {setUpCar} from "../logic/setUpHelper";
import {io} from "../io/terminal/io";
import {GameState} from "./gameState";
import {driveLap, sortRaceStandings} from "../logic/raceLogic";
import {getTeamById} from "./gameHelpers";
import {closeRandomOvertakingZone, createTrackModifiersForCondition, rollTrackCondition} from "../logic/trackLogic";
import {debugTrackModifiers} from "../debug/debug";
import {setupFocusLoop} from "../inputLoops/setupFocusLoop";



export const phaseRunner = async (phase: Phase, gameState: GameState): Promise<GameState> => {
    io.print("-------" + phase.name + "-------");
    gameState.currentPhase = phase;
    raceCardEffects(gameState);

    // DEBUG:
    io.debug("Current phaseEffect: " + JSON.stringify(gameState.phaseEffect, null, 2))
    debugTrackModifiers(gameState.currentTrack)

    // Present conditions for phase for players
    if (phase.type === "BUILDUP") {
        const standingsAfterBuildUp = runBuildUp(phase, gameState);
        return standingsAfterBuildUp;
    } else if (phase.type === "SETUP") {
        const standingsAfterSetup = runSetUp(phase, gameState);
        return standingsAfterSetup;
    } else if (phase.type === "QUALIFICATION") {
        const standingsAfterQualification = await runQualification(phase, gameState);
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

export const runSetUp = async (phase: Phase, gameState: GameState): Promise<GameState> => {
    for (const driver of gameState.raceStandings) {
        let setupFocuses: SetupFocus[];

        if (driver.isNPC) {
            // TODO: Replace with actual AI logic later
            setupFocuses = ["topspeed", "rain", "reliability"];
        } else {
            setupFocuses = await setupFocusLoop();
        }

        setUpCar(driver, setupFocuses);
    }

    return gameState;
};


export const runQualification = async  (phase: Phase, gameState: GameState): Promise<GameState> => {
    const qualifyingSession: Session = {
        trackId: gameState.currentTrack.id,
        type: "qualifying",
        laps: {},
    };

    const phaseOrder: GameDriver[] = [];

    for (const driver of gameState.raceStandings) {
        await fitCarWithTyres(driver, gameState);
        const lap = driveLap(driver, gameState, { risk: 0, flow: 0 });

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

        // const lapTimeStr = driver.latestLap?.lapTime ?? "N/A";
        const lapTimeStr = driver.latestLap?.rollTotal ?? 0;
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

export const raceCardEffects = (gameState: GameState) => {
    const raceCard = gameState.raceCards.draw();
    io.print(`Race Card drawn: ${raceCard.name} — ${raceCard.description}`);
    // make new race card accessible:
    gameState.currentRaceCard = raceCard;

    // old phaseEffects shall be removed each new phase
    gameState.phaseEffect = undefined;

    // track condition:
    if (raceCard.effect.type === "trackConditionChange") {
        const newCondition: TrackCondition = rollTrackCondition(gameState.currentTrack);
        gameState.currentCondition = newCondition;
        io.print(`New track condition rolled: ${newCondition}`);
        const newModifiers: TrackModifier[] = createTrackModifiersForCondition(newCondition);

        // Replace or add to track modifiers:
        gameState.currentTrack.modifiers = newModifiers;

    } else if (raceCard.effect.type === "yellowFlag") {
        const zoneToClose = closeRandomOvertakingZone(gameState);
        if (zoneToClose) {
            gameState.phaseEffect = {
                type: "yellowFlag",
                closedZone: zoneToClose,
                paceFactor: 0.5 // halve pace
            };
        }

    } else if (raceCard.effect.type === "oilSpill") {
        const zoneToClose = closeRandomOvertakingZone(gameState);
        if (zoneToClose) {
            gameState.phaseEffect = {
                type: "oilSpill",
                closedZone: zoneToClose,
                increasedRisk: 1,
            }
        }
    }

    if (gameState.phaseEffect) {
        io.debug(`Phase effect active: ${gameState.phaseEffect.type}`);

        if (gameState.phaseEffect.type === "oilSpill") {
            io.print(` - Closed overtaking zone: ${gameState.phaseEffect.closedZone.name}`);
            io.print(` - Increased risk: ${gameState.phaseEffect.increasedRisk}`);
        } else if (gameState.phaseEffect.type === "yellowFlag") {
            io.print(` - Closed overtaking zone: ${gameState.phaseEffect.closedZone.name}`);
            io.print(` - Lap time Mod: ${gameState.phaseEffect.paceFactor}`);
        }
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