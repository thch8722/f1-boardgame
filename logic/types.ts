// Car attributes and modifiers
import {Card} from "./cards";

export type CarAttribute = "speed" | "handling" | "setupEase";

export type CarAttributes = Record<CarAttribute, number>;

export type CarComponent = 'engine' | 'tyres' | 'brakes' | 'gearbox';

export type CarComponents = Record<CarComponent, number>;

export type AttributeModifier = {
    source: string;
    mod: Partial<CarAttributes>;
    description?: string;
};

// Static car definition
export type CarTemplate = {
    id: string;
    name: string;
    team: string;
    attributes: CarAttributes;
    components: CarComponents;
};

// In-race instance of a car
export type CarInstance = {
    id: string;
    driverId: string;
    baseCar: CarTemplate;
    modifiers: AttributeModifier[];
    components: CarComponents;
    status: {
        incidents: string[];
    };
};

// Driver stuff:
export type GameDriver = Driver & {
    isNPC: boolean;
    Player: string;     // TODO a Player is a real person/user
};

export type DriverAttribute =
    | "mechanicalFeel"  // 1-5
    | "speed"           // 1-5
    | "focus"           // 1-5
    | "racecraft"       // 1-5
    | "adaptability";   // 1-5 optional use

export type DriverTrait =
    | "Aggressive"
    | "Showman"
    | "Rookie"
    | "Unpredictable"
    | "Cool and calm"
    | "Default"

export type DriverAttributes = Record<DriverAttribute, number>;

export type Driver = {
    id: string;
    name: string;
    attributes: DriverAttributes;
    car: string;    // matches id of car
    team: string;
    homeTrackId?: string; // optional
    carNumber: number;
    traits: DriverTrait[];
};

// tracks stuff:
export type FinishStatus = "finished" | "retired" | "disqualified";

export type LapPerformance = {
    driverId: string;
    lapTime: string;
};

export type RaceStanding = {
    position: number;             // 1 for winner, etc.
    driverId: string;
    status: FinishStatus;
    totalTime?: number;           // in seconds, only if finished
    gapToWinner?: number;         // optional, in seconds
    retiredOnLap?: number;        // only if retired
};

export type RaceResult = {
    trackId: string;
    pole: LapPerformance;
    fastestLap: LapPerformance;
    standings: RaceStanding[];
};

export type OvertakeFavouredStat = "speed" | "handling";

export type OvertakingZone = {
    name: string;
    difficulty: number;     // 1-4
    favours: OvertakeFavouredStat;
};

export type TrackAttributes = {
    speedBias: number;          // 1-4
    technicality: number;       // 1-4
    rainChance: number;         // 0–100
    prestige: number;           // 1-4
    wearFactor: number;         // 1-4
    laps: number;               //1-100
};

export type Track = {
    id: string;
    name: string;
    country: string;
    attributes: TrackAttributes;
    overtakingZones: OvertakingZone[];
    eventDate: string;
};

// team:
export type GameTeam = Team & {
    isNPC: boolean;
    Player: string;     // TODO a Player is a real person/user
};

export type Team = {
    id: string;
    name: string;
    country: string;
    models: string[]; // IDs of car templates/models, e.g. "lotus_78"
    cars: CarInstance[];   // IDs of actual cars (race entries), e.g. "lotus_78_1", "lotus_78_2"
};

// Event cards:
export interface EventCard extends Card {
    effect: EventEffect;
    canBeSaved?: boolean; // optional
}

export type EventEffect =
    | "gainServicePoint" // Gain 1 service point (used to repair or improve car performance)
    | "gainFlowPoint"     // Gain 1 flow point (used as +1 modifier on actions)
    | "rollRisk"          // Roll risk dice (might trigger an incident card)
    | "divineInsight"     // Get a setup or service effect without needing a pit stop

export interface IncidentCard extends Card {
    effect: IncidentEffect;
}

export type IncidentEffect =
    | "spin"             // Lose time + places; also reduces qualifying potential
    | "overheat"         // Forced to defend next turn (-1 pace, +1 defend)
    | "gearboxSnag"      // Serious car glitch — could lead to performance drop or component damage
    | "loseHandling"     // Permanent -1 to the car's handling attribute
    | "loseSpeed"        // Permanent -1 to the car's speed attribute
    | "loseComponentHP"  // Lose 1 HP on a component (e.g., brakes, engine); 0 HP is dangerous
    | "loseSetup"        // Lose setup advantage; may affect pace or control depending on phase
    | "contact"          // risk for me and for closest rival

// Phase data:
export type PhaseType =
    | "BUILDUP"
    | "SETUP"
    | "QUALIFICATION"
    | "RACE"
    | "FINAL"
    | "CHECKERED";

export interface Phase {
    id: string;
    name: string;                 // Display name: "Qualification", "Lap 12", "Checkered Flag"
    type: PhaseType;             // Enum-like: BUILDUP, SETUP, QUALI, RACE, FINAL, END
    description?: string;        // Optional lore or guidance
    isRacePhase?: boolean;       // Quick flag for race loop
    specialEffects?: string[];   // Narrative or mechanical hooks (e.g., "driverFatigue")
}



