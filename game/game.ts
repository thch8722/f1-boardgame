import {AttributeModifier, CarInstance, CarTemplate, Driver, GameDriver, GameTeam, Team} from "../logic/types";
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
import {buildEventDeck, buildIncidentDeck} from "../logic/cards";
import {buildRacePhases} from "../data/phases/phases";

// Start game

export const startGame = () => {
    const drivers = createGameDrivers(drivers1978);
    const teams: GameTeam[] = createGameTeams(teams1978);

    assignNpcDriversToCars(drivers, teams);
    const tracks = createGameTracks(tracks1978);
    const eventCards = buildEventDeck();
    const incidentCards = buildIncidentDeck();

    const phases = buildRacePhases();

    return {
        "drivers": drivers,
        "teams": teams,
        "tracks": tracks,
        "events": eventCards,
        "incidents": incidentCards,
        "phases": phases,
    }
}

// TODO
/*

attribut 1-7 (4 === 0)
d12 dice OR d6 + d6
Github
faktor för attributstackning så det i princip blir
d12 + attribut
eller
d12 + (attribut/2) + (attribut/2)


setup
quali



 */