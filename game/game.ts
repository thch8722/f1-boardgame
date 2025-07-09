import {
    AttributeModifier,
    CarInstance,
    CarTemplate,
    Driver,
    GameDriver,
    GameTeam,
    RaceCard,
    Team
} from "../logic/types";
import {drivers1978} from "../data/1978/drivers";
import {
    assignNpcDriversToCars,
    createGameDrivers,
    createGameTeams, createGameTracks,
    getCarTemplateById,
    getTeamById, getTrackById
} from "./gameHelpers";
import {teams1978} from "../data/1978/teams";
import {cars1978} from "../data/1978";
import {tracks1978} from "../data/1978/tracks";
import {buildEventDeck, buildIncidentDeck, buildRaceCardDeck, CardDeck} from "../logic/cards";
import {buildRacePhases} from "../data/phases/phases";
import {phaseRun} from "./phaseRun";

// Start game

export const startGame = () => {
    const drivers = createGameDrivers(drivers1978); // Initial array, sorted by numbers

    const seasonStandings = [... drivers];    // drivers by current race standings

    let raceStandings = [...drivers];

    const teams: GameTeam[] = createGameTeams(teams1978);

    assignNpcDriversToCars(drivers, teams);
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


// TODO
/*
Add championship points to players
Better looking championship table (maybe a function)
Setup Cars
IO hooks to wait for or accept player input




 */