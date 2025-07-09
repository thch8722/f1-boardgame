import {startGame} from "./game";
import {teams1978} from "../data/1978/teams";
import * as assert from "node:assert";
import {CarTemplate, GameDriver, Team} from "../logic/types";
import {getTeamById} from "./gameHelpers";
import {cars1978} from "../data/1978";


const driverAttributeSum = (driver: GameDriver) => {
    return driver.attributes.adaptability
        + driver.attributes.speed
        + driver.attributes.racecraft
        + driver.attributes.focus
        + driver.attributes.mechanicalFeel;
}

const modelAttributes = (carTemplate: CarTemplate) => {
    return carTemplate.attributes.speed
    + carTemplate.attributes.handling
    + carTemplate.attributes.setupEase
}

const modelComponents = (carTemplate: CarTemplate) => {
    return carTemplate.components.gearbox
    + carTemplate.components.brakes
    + carTemplate.components.tyres
    + carTemplate.components.engine;
}

export const testLog = (content: string) => {
    process.stdout.write(content + '\n');
}

test("startGame initializes correctly", () => {
    const game = startGame();
    expect(game.drivers.length).toBeGreaterThan(0);
    expect(game.drivers[0].carNumber).toBe(1);

    const driversBySkill: GameDriver[] = [];
    for (const driver of game.drivers) {
        driversBySkill.push(driver);
    }
    driversBySkill.sort((a, b) => {
        const driverA = a as unknown as GameDriver;
        const driverB = b as unknown as GameDriver;
        return driverAttributeSum(driverB) - driverAttributeSum(driverA);
    });

    const carsByAttributes: CarTemplate[] = [];
    const carsByComponents: CarTemplate[] = [];
    for (const model of cars1978) {
        carsByAttributes.push(model);
        carsByComponents.push(model);
    }
    carsByAttributes.sort((a,b) => {
        return modelAttributes(b) - modelAttributes(a);
    });
    carsByComponents.sort((a,b) => {
        return modelComponents(b) - modelComponents(a);
    });

    // fastest car:
    /*
    for (const model of carsByAttributes) {
        testLog(model.name + ":" + modelAttributes(model));
    }

     */
    // most reliable car:
    /*
    for (const model of carsByComponents) {
        testLog(model.name + ": " + modelComponents(model));
    }

     */

    // MOst skillful drivers
    /*
    for (const d of driversBySkill) {
        const driver = d as unknown as GameDriver;
        testLog(driver.name + " skill:" + driverAttributeSum(driver));
    }

     */
    /*
    const eventCard = game.events.draw()
    testLog("Event Card : " + eventCard.name);
    const incidentCard = game.incidents.draw();
    testLog("INCIDENT! : " + incidentCard.name);

     */
    const raceCard = game.raceCards.draw();
    testLog("Race card : " + raceCard.name);

    for (const phase of game.phases) {
        testLog("Phase " + phase.name);
    }




    // more assertions...
    /*
    for (const driver of game.drivers) {
        console.log(driver.name);
    }

     */

/*
    for (const team of game.teams) {
        console.log(team.name);
    }
    for(const driver of game.drivers) {
        const team = getTeamById(driver.team, game.teams);
        if (team === undefined || team === null) {
            console.log("driver lacks team {}", driver.name);
        } else {
            console.log(driver.name + " drives for " + team.name);
        }
    }
    expect(game.teams.length).toBe(15);

 */

    // TODO Fix test

    // TODO match drivers with teams
});