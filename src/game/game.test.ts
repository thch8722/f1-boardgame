import {CarInstance, CarTemplate, GameDriver, GameTeam, Team} from "../logic/types";
import {cars1978} from "../data/1978";
import {getTeamById} from "./gameHelpers";



const driverAttributeSum = (driver: GameDriver) => {
    return driver.attributes.bravery
        + driver.attributes.speed
        + driver.attributes.rainSkill
        + driver.attributes.racecraft
        + driver.attributes.focus
        + driver.attributes.mechanicalFeel;
}

const modelAttributes = (carTemplate: CarTemplate) => {
    return carTemplate.attributes.speed
    + carTemplate.attributes.handling
    + carTemplate.setupEase
}

const modelComponents = (carTemplate: CarTemplate) => {
    return carTemplate.components.gearbox
    + carTemplate.components.brakes
    + carTemplate.components.tyres
    + carTemplate.components.engine;
}

test.skip("startGame initializes correctly", () => {

});