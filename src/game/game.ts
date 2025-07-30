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
car can be setup for rain, different conditions
lap times are off
-Phase lap driving function:

yellow flag clamped top speed
driver penalty

tyres
driver and different conditions
inlcluding rain, oil spill, qualification, yellow card, being early "lap" or late "lap". isRiskIncident
-We shall drive thru all the phases with different conditions (weather and other conditions).
-We shall implement phase effects
-e shall overtake when necessary.
-We shall make better interactions both for player and NPC, as teams and as drivers
-we shall build a service point economy.
-We shall drive into pit when we need that
-fix empty card deck exception
-We shall make game function with other sets of car attributes
-Add more -78 cars teams and drivers
-Do season -82

 */