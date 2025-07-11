import readline from 'readline';


import {
    GameDriver,
    GameTeam,
    RaceCard
} from "../logic/types";
import {drivers1978} from "../data/1978/drivers";
import {
    buildCarRecord,
    createGameDrivers,
    createGameTeams, createGameTracks
} from "./gameHelpers";
import {teams1978} from "../data/1978/teams";
import {tracks1978} from "../data/1978/tracks";
import {buildEventDeck, buildIncidentDeck, buildRaceCardDeck, CardDeck} from "../logic/cards";
import {buildRacePhases} from "../data/phases/phases";
import {phaseRun} from "./phaseRun";

// Start game

export const startGame = () => {
    const teams: GameTeam[] = createGameTeams(teams1978);
    const carRecord = buildCarRecord(teams);

    const drivers = createGameDrivers(drivers1978, carRecord); // Initial array, sorted by numbers

    const seasonStandings = [... drivers];    // drivers by current race standings

    let raceStandings = [...drivers];

    //assignNpcDriversToCars(drivers, carRecord);
    const tracks = createGameTracks(tracks1978);
    const eventCards = buildEventDeck();
    const incidentCards = buildIncidentDeck();
    const raceCards: CardDeck<RaceCard> = buildRaceCardDeck();


    const phases = buildRacePhases();

    for (const phase of phases) {
        raceStandings = phaseRun(phase, raceStandings);
    }

    return {
        "drivers": drivers,
        "seasonStandings": seasonStandings,
        "raceStandings": raceStandings,
        "teams": teams,
        "tracks": tracks,
        "events": eventCards,
        "incidents": incidentCards,
        "raceCards": raceCards,
        "phases": phases,
    }
}

// selectDriversLoop.ts
export const selectDriversLoop = async (drivers: GameDriver[], rl: readline.Interface) => {
    const ask = (question: string) =>
        new Promise<string>((resolve) => rl.question(question, resolve));

    console.log("Select drivers to control. Type driver ID or name (or 'done' to finish):");

    while (true) {
        const input = (await ask("> ")).trim();

        if (input.toLowerCase() === "done") {
            console.log("Driver selection finished.");
            break;
        }

        const driver = drivers.find(
            (d) =>
                d.id.toLowerCase() === input.toLowerCase() ||
                d.name.toLowerCase() === input.toLowerCase()
        );

        if (!driver) {
            console.log(`Driver "${input}" not found, try again.`);
        } else {
            driver.isNPC = false;
            driver.player = "you";
            console.log(`You now control driver: ${driver.name}`);
        }
    }

    // DO NOT close rl here!
    return drivers;
};



export const interactiveGame = async () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const ask = (question: string) =>
        new Promise<string>((resolve) => rl.question(question, resolve));

    // Setup initial game state
    const teams: GameTeam[] = createGameTeams(teams1978);
    const carRecord = buildCarRecord(teams);
    const drivers = createGameDrivers(drivers1978, carRecord);
    let seasonStandings = [...drivers];
    let raceStandings = [...drivers];
    const tracks = createGameTracks(tracks1978);
    const eventCards = buildEventDeck();
    const incidentCards = buildIncidentDeck();
    const raceCards = buildRaceCardDeck();
    const phases = buildRacePhases();

    await selectDriversLoop(drivers, rl);

    let currentPhaseIndex = 0;

    console.log("Welcome to 1978 F1 Game!");
    console.log(
        `There are ${phases.length} race phases.\nType "next" to run the next phase, "status" to see current standings, "exit" to quit.\n`
    );

    while (true) {
        const input = (await ask("> ")).trim().toLowerCase();

        if (input === "exit") {
            console.log("Thanks for playing!");
            break;
        } else if (input === "status") {
            console.log("\nCurrent race standings:");
            raceStandings.forEach((d, i) =>
                console.log(`${i + 1}. ${d.name} (${d.team})`)
            );
            console.log("");
        } else if (input === "next") {
            if (currentPhaseIndex >= phases.length) {
                console.log("All phases completed.");
                continue;
            }

            const phase = phases[currentPhaseIndex];
            console.log(`Running phase ${currentPhaseIndex + 1}: ${phase.name}`);
            raceStandings = phaseRun(phase, raceStandings);
            currentPhaseIndex++;
        } else {
            console.log('Unknown command. Use "next", "status", or "exit".');
        }
    }

    rl.close();
};
// TODO
/*
Setup Cars
IO hooks to wait for or accept player input




 */