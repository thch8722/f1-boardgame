import {AttributeModifier, CarInstance, CarTemplate, Driver, GameDriver, GameTeam, Team, Track} from "../logic/types";
import {cars1978} from "../data/1978";


export function createGameDrivers(drivers: Driver[]): GameDriver[] {
    return drivers
        .map(driver => ({
            ...driver,
            isNPC: true,
            Player: "",
        }))
        .sort((a, b) => a.carNumber - b.carNumber);
}

export function createGameTeams(teams: Team[]): GameTeam[] {
    const gameTeams = teams
        .map(team => ({
            ...team,
            isNPC: true,
            Player: ""
        }));

    for (const team of gameTeams) {

        // Count how many times each model appears to generate chassis number correctly
        const modelCounts: Record<string, number> = {};
        for (const model of team.models) {
            const baseCar: CarTemplate | undefined = getCarTemplateById(model, cars1978);
            const modelId = baseCar?.id;
            if (!modelId || !baseCar) {
                break;
            }
            modelCounts[modelId] = (modelCounts[modelId] || 0) + 1;
            const chassisNumber = modelCounts[modelId];
            const carId = `${modelId}_${chassisNumber}`;

            // Create car instance
            const carInstance: CarInstance = {
                id: carId,
                driverId: "", // will assign driver later as needed
                baseCar,
                tireType: "dry",
                modifiers: [] as AttributeModifier[],
                components: { ...baseCar.components },
                status: {
                    incidents: [],
                },
            };


            team.cars.push(carInstance);
        }
    }

    return gameTeams;
}

export function getTeamById(id: string, teams: GameTeam[]): GameTeam | undefined {
    return teams.find(team => team.id === id);
}

export function getDriverById(id: string, drivers: GameDriver[]): GameDriver | undefined {
    return drivers.find(driver => driver.id === id);
}

export function getCarTemplateById(id: string,models: CarTemplate[]): CarTemplate | undefined {
    return models.find(car => car.id === id);
}

export function getTrackById(id: string, tracks: Track[]): Track | undefined {
    return tracks.find(track => track.id === id);
}

// TODO:
// export function getTrackById(id: string, )

export function assignNpcDriversToCars(drivers: GameDriver[], teams: GameTeam[]) {
    for (const team of teams) {
        const teamDrivers = drivers.filter(d => d.team === team.id && d.isNPC);
        for (let i = 0; i < teamDrivers.length; i++) {
            const driver = teamDrivers[i];
            const car = team.cars[i];
            if (car) {
                car.driverId = driver.id;
                driver.car = car;
            }
        }
    }
}

class GameTrack {
}

export function createGameTracks(tracks: Track[]): Track[] {
    return tracks.map(track => ({
        ...track,
        pole: { driverId: "", lapTime: 0 },
        fastestLap: { driverId: "", lapTime: 0 },
        finalStandings: [],
    }));
}

export function assignPlayerToCar(driverId: string, carId: string, drivers: GameDriver[], teams: GameTeam[]) {
    const driver = drivers.find(d => d.id === driverId);
    const car = teams.flatMap(t => t.cars).find(c => c.id === carId);

    if (driver && car) {
        driver.car = car.id;
        car.driverId = driver.id;
        driver.isNPC = false;
        car.status = car.status || { incidents: [] };
    }
}