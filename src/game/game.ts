import {io} from "../io/terminal/io";
import {selectDriversLoop} from "../inputLoops/selectDriversLoop";
import {racePhasesLoop} from "../inputLoops/racePhasesLoop";
import {createInitialGameState} from "./gameState";


export const interactiveGame = async () => {

    // Setup initial game state
    const gameState = createInitialGameState();
    const drivers = gameState.drivers;

    await selectDriversLoop(drivers);
    await racePhasesLoop(gameState);

    // io IS OPEN
    io.close();
};
// TODO
/*
qualification calculate speed
Send cards, track and all into phaserun noop
USER Setup loop
NPC setup including personality and track conditions





 */