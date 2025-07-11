

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
import {io} from "../io/terminal/io";
import {selectDriversLoop} from "../inputLoops/selectDriversLoop";
import {racePhasesLoop} from "../inputLoops/racePhasesLoop";

// Start game
/*
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

 */

export const interactiveGame = async () => {

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

    await selectDriversLoop(drivers);
    await racePhasesLoop(phases, raceStandings, phaseRun);

    // io IS OPEN
    io.close();
};
// TODO
/*
Setup Cars
IO hooks to wait for or accept player input




 */