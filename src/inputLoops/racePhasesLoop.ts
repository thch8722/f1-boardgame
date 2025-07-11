import { io } from "../io/terminal/io";
import { Phase } from "../logic/types"; // adjust if needed
import { GameDriver } from "../logic/types"; // adjust if needed

// main loop:

type PhaseRunner = (phase: Phase, standings: GameDriver[]) => GameDriver[];

export const racePhasesLoop = async (
    phases: Phase[],
    initialStandings: GameDriver[],
    phaseRun: PhaseRunner
) => {
    let currentPhaseIndex = 0;
    let raceStandings = [...initialStandings]; // keep it pure

    io.print("Welcome to 1978 F1 Game!");
    io.print(
        `There are ${phases.length} race phases.\n` +
        `Type "next" to run the next phase, "status" to see current standings, "exit" to quit.\n`
    );

    while (true) {
        const input = (await io.ask("> ")).trim().toLowerCase();

        if (input === "exit") {
            io.print("Thanks for playing!");
            break;
        } else if (input === "status") {
            io.print("\nCurrent race standings:");
            raceStandings.forEach((d, i) =>
                io.print(`${i + 1}. ${d.name} (${d.team})`)
            );
            io.print("");
        } else if (input === "next") {
            if (currentPhaseIndex >= phases.length) {
                io.print("All phases completed.");
                continue;
            }

            const phase = phases[currentPhaseIndex];
            io.print(`Running phase ${currentPhaseIndex + 1}: ${phase.name}`);
            raceStandings = phaseRun(phase, raceStandings);
            currentPhaseIndex++;
        } else {
            io.print('Unknown command. Use "next", "status", or "exit".');
        }
    }

    return raceStandings; // so you can see final results if you want
};
