import {
    AttributeModifier,
    CarInstance,
    CarTemplate,
    DriverRaw,
    GameDriver,
    GameTeam,
    Team,
    Track
} from "../logic/types";
import {cars1978} from "../data/1978";


export function createGameDrivers(
    rawDrivers: DriverRaw[],
    carRecord: Record<string, CarInstance>
): GameDriver[] {
    return rawDrivers
        .map(raw => {
            const carInstance = carRecord[raw.car];
            if (!carInstance) {
                throw new Error(`No car found for driver ${raw.name} (id: ${raw.car})`);
            }
            return {
                ...raw,
                car: carInstance,
                isNPC: true,
                player: undefined,
            };
        })
        .sort((a, b) => a.carNumber - b.carNumber);
}

export function createGameTeams(teams: Team[]): GameTeam[] {
    const gameTeams = teams.map(team => ({
        ...team,
        isNPC: true,
        Player: "",
        cars: team.cars || [],  // initialize if missing
    }));

    for (const team of gameTeams) {
        const modelCounts: Record<string, number> = {};

        for (const model of team.models) {
            const baseCar: CarTemplate | undefined = getCarTemplateById(model, cars1978);
            const modelId = baseCar?.id;

            if (!modelId || !baseCar) {
                console.warn(`Missing car template for model ${model}`);
                continue;
            }

            modelCounts[modelId] = (modelCounts[modelId] || 0) + 1;
            const chassisNumber = modelCounts[modelId];
            const carId = `${modelId}_${chassisNumber}`;

            const carInstance: CarInstance = {
                id: carId,
                driverId: "",
                baseCar,
                tireType: "dry",
                modifiers: [],
                components: { ...baseCar.components },
                status: {
                    incidents: [],
                },
                componentHPModifiers: []
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
export function buildCarRecord(teams: GameTeam[]): Record<string, CarInstance> {
    const carMap: Record<string, CarInstance> = {};
    for (const team of teams) {
        for (const car of team.cars) {
            carMap[car.id] = car;
        }
    }
    return carMap;
}

export function assignNpcDriversToCars(drivers: GameDriver[], carRecord: Record<string, CarInstance>) {
    const npcs = drivers.filter(d => d.isNPC);
    for (const driver of npcs) {
        const carId: string = driver.car as unknown as string;
        if (carId && carRecord[carId]) {
            const car = carRecord[carId];
            car.driverId = driver.id;
            driver.car = car;
        }
         else {
            console.warn(`No car found for driver ... ${driver.name} with car ID ${driver.car}`);
        }
    }
}
/*
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

 */

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
        driver.car = car;
        car.driverId = driver.id;
        driver.isNPC = false;
        car.status = car.status || { incidents: [] };
    }
}