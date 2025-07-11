import { io } from "../io/terminal/io";
import { Phase } from "../logic/types"; // adjust if needed
import { GameDriver } from "../logic/types";
import {GameState} from "../game/gameState";
import {phaseRunner} from "../game/phaseRunner"; // adjust if needed

// main loop:

type PhaseRunner = (phase: Phase, gameState: GameState) => GameDriver[];

export const racePhasesLoop = async (
    gameState: GameState
) => {
    const phases = gameState.phases;

    let currentPhaseIndex = 0;
    let raceStandings = [...gameState.raceStandings]; // keep it pure

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
            gameState = phaseRunner(phase, gameState);
            currentPhaseIndex++;
        } else {
            io.print('Unknown command. Use "next", "status", or "exit".');
        }
    }

    return raceStandings; // so you can see final results if you want
};
