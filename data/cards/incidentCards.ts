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
        count: 2,
    },
    {
        effect: "overheat",
        name: "Overheating",
        description: "Forced to back off and defend this turn",
        count: 3,
    },
    {
        effect: "loseComponentHP",
        name: "Damage",
        description: "Damage to component",
        count: 4,
    },
    {
        effect: "gearboxSnag",
        name: "Gearbox Snag",
        description: "Gearbox problem slows car down",
        count: 2,
    },
    {
        effect: "loseHandling",
        name: "Handling Loss",
        description: "Loss of car handling (-1 handling)",
        count: 2,
    },
    {
        effect: "loseSpeed",
        name: "Speed Loss",
        description: "Loss of car speed (-1 speed)",
        count: 2,
    },
    {
        effect: "loseSetup",
        name: "Setup Loss",
        description: "Setup compromised, slower lap times",
        count: 2,
    },

];