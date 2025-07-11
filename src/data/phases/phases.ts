import {Phase} from "../../logic/types";


export const phaseTemplates: Phase[] = [
    {
        id: "buildup",
        name: "Race Summary & Buildup",
        type: "BUILDUP",
        description: "The paddock buzzes. Mechanics and media swarm.",
    },
    {
        id: "free_practice",
        name: "Free Practice",
        type: "SETUP",
        description: "Drivers test the track and help engineers dial in handling, gears, and balance.",
    },
    {
        id: "qualification",
        name: "Qualification",
        type: "QUALIFICATION",
        description: "Each car attempts a fast lap. Grid positions are decided.",
    },
    {
        id: "race_start",
        name: "Race Start",
        type: "RACE",
        description: "Engines roar. Everyone prepares to launch.",
        isRacePhase: true,
    },
    {
        id: "lap_midrace",
        name: "Mid-Race Laps",
        type: "RACE",
        description: "Settled rhythm or mid-race shakeups. Fatigue and tire wear begin to show.",
        isRacePhase: true
    },
    {
        id: "lap_final",
        name: "Final Laps",
        type: "FINAL",
        description: "Cars lose weight but drivers may lose focus.",
        isRacePhase: true,
        specialEffects: ["driverFatigue", "carDegradation"],
    },
    {
        id: "checkered",
        name: "Checkered Flag",
        type: "CHECKERED",
        description: "The race is over. Points are awarded. Some are heroes.",
    }
];

export function buildRacePhases(): Phase[] {
    const phases: Phase[] = [];

    // Helper to clone phase with new unique id for repeatable phases
    const clonePhaseWithIndex = (phase: Phase, index: number): Phase => ({
        ...phase,
        id: `${phase.id}_${index + 1}`,  // e.g. lap_midrace_1
        name: `${phase.name} #${index + 1}`, // optional, to display lap number
    });

    for (const phase of phaseTemplates) {
        if (phase.id === "lap_midrace") {
            // Add 3 mid-race laps
            for (let i = 0; i < 3; i++) {
                phases.push(clonePhaseWithIndex(phase, i));
            }
        } else if (phase.id === "lap_final") {
            // Add 2 final laps
            for (let i = 0; i < 2; i++) {
                phases.push(clonePhaseWithIndex(phase, i));
            }
        } else {
            // Add other phases once as-is
            phases.push(phase);
        }
    }

    return phases;
}

