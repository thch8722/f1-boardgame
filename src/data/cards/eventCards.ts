import { EventEffect } from "../../logic/types";

interface EventCardTemplate {
    effect: EventEffect;
    name: string;
    description: string;
    count: number; // how many copies in the deck
}

export const eventCardTemplates: EventCardTemplate[] = [
    {
        effect: "gainServicePoint",
        name: "Extra Focus",
        description: "Gain 1 service point — your team is in sync.",
        count: 2,
    },
    {
        effect: "gainFlowPoint",
        name: "Rhythm Found",
        description: "Gain 1 flow point — the driver is feeling it.",
        count: 3,
    },
    {
        effect: "rollRisk",
        name: "Unprovoked Error",
        description: "Roll a risk die — anything can happen today.",
        count: 1,
    },
    {
        effect: "rollRiskNoGain",
        name: "Unprovoked Error",
        description: "Roll a risk die — anything can happen today.",
        count: 1,
    },
    {
        effect: "divineInsight",
        name: "Divine Insight",
        description: "Service/setup effect without pit stop.",
        count: 1,
    },
    // TODO add Unprovoced ERROR no gain
];