import { IncidentEffect } from "../../logic/types";

interface IncidentCardTemplate {
    effect: IncidentEffect;
    name: string;
    description: string;
    count: number; // how many copies in the deck
}

export const incidentCardTemplates: IncidentCardTemplate[] = [
    {
        effect: "spin",
        name: "Spin",
        description: "Time, momentum and places lost",
        count: 3,
    },
    {
        effect: "overheat",
        name: "Overheating",
        description: "Forced to back off and defend this turn",
        count: 3,
    },
    {
        effect: "majorOverheat",
        name: "Major Overheating",
        description: "Forced to back off completely this turn",
        count: 1,
    },
    {
        effect: { type: "loseComponentHP", component: "engine" },
        name: "Engine Damage",
        description: "Lose 1 HP on engine",
        count: 2
    },
    {
        effect: { type: "loseComponentHP", component: "brakes" },
        name: "brakes Damage",
        description: "Lose 1 HP on breaks",
        count: 2
    },
    {
        effect: { type: "loseComponentHP", component: "gearbox" },
        name: "Gearbox Damage",
        description: "Lose 1 HP on gearbox",
        count: 2
    },
    {
        effect: { type: "loseComponentHP", component: "tyres" },
        name: "tyre Wear",
        description: "Lose 1 HP on tyres",
        count: 4
    },
    {
        effect: "loseSetup",
        name: "Setup Loss",
        description: "Setup compromised, slower lap times",
        count: 2,
    },
    {
        effect: "contact",
        name: "Wheel to wheel Contact",
        description: "Contact with closest car ahead (If there is one)",
        count: 1,
    },
    {
        effect: "crash",
        name: "Crash!!!",
        description: "End of race - add component damage",
        count: 1,
    },
];