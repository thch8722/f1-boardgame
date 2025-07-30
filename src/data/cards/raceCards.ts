import {RaceEffect} from "../../logic/types";


export type RaceCardTemplate = {
    effect: RaceEffect;
    name: string;
    description: string;
    count: number;
}

export const raceCardTemplates: RaceCardTemplate[] = [
    {
        effect: { type: "trackConditionChange" },
        name: "Weather change",
        description: "Roll dice for weather change (wet or dry)",
        count: 4
    },
    {
        effect:  { type: "yellowFlag" },
        name: "Yellow flag",
        description: "Yellow flag, reduce speed, no overtaking in one or more zones",
        count: 2
        //count: 100000
    },
    {
        effect:  { type: "oilSpill" },
        name: "Oil spill",
        description: "Cars handle less well, and no overtaking in one zone. Increased risk",
        count: 2
    },
    {
        effect: { type: "noChange"},
        name: "No change",
        description: "No race events in this phase",
        count: 1
    }
]