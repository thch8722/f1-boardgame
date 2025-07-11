

import {
    GameDriver,
    GameTeam,
    RaceCard,
    Phase,
    Track,
    EventCard,
    IncidentCard,
} from "../logic/types";
import {buildCarRecord, createGameDrivers, createGameTeams, createGameTracks} from "./gameHelpers";
import {teams1978} from "../data/1978/teams";
import {drivers1978} from "../data/1978/drivers";
import {tracks1978} from "../data/1978/tracks";
import {buildEventDeck, buildIncidentDeck, buildRaceCardDeck, CardDeck} from "../logic/cards";
import {buildRacePhases} from "../data/phases/phases"; // adjust your imports accordingly

export interface GameState {
    teams: GameTeam[];
    carRecord: Record<string, any>;  // adjust type to your carRecord shape
    drivers: GameDriver[];
    seasonStandings: GameDriver[];
    raceStandings: GameDriver[];
    tracks: Track[];
    currentTrack: Track;
    eventCards: CardDeck<EventCard>;
    incidentCards: CardDeck<IncidentCard>;
    raceCards: CardDeck<RaceCard>;
    phases: Phase[];
}

export const createInitialGameState = (): GameState => {
    const teams = createGameTeams(teams1978);
    const carRecord = buildCarRecord(teams);
    const drivers = createGameDrivers(drivers1978, carRecord);
    const seasonStandings = [...drivers];
    const raceStandings = [...drivers];
    const tracks = createGameTracks(tracks1978);
    const eventCards = buildEventDeck();
    const incidentCards = buildIncidentDeck();
    const raceCards = buildRaceCardDeck();
    const phases = buildRacePhases();

    return {
        teams,
        carRecord,
        drivers,
        seasonStandings,
        raceStandings,
        tracks,
        currentTrack: tracks[0],
        eventCards,
        incidentCards,
        raceCards,
        phases,
    };
};
