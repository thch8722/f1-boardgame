// Car attributes and modifiers
import {Card} from "./cards";

export type CarAttribute = "speed" | "handling" | "setupEase";

export type CarAttributes = Record<CarAttribute, number>;

export type CarComponent = 'engine' | 'tyres' | 'brakes' | 'gearbox';

export type CarComponents = Record<CarComponent, number>;

export type AttributeModifierSource = 'setup' | 'damage' | 'wear';

export type AttributeModifierCondition =
    | "qualification"
    | "wet"
    | "finalLaps"
    | "wheelToWheel";

export type AttributeModifier = {
    source: AttributeModifierSource;
    mod: Partial<CarAttributes>;
    condition?: AttributeModifierCondition | AttributeModifierCondition[];
    description?: string;
};

export type ComponentHPModifier = {
    source: AttributeModifierSource; // 'setup' | 'damage' | 'wear' etc
    mod: Partial<CarComponents>;     // e.g. { engine: -1, tyres: +1 }
    condition?: AttributeModifierCondition | AttributeModifierCondition[];
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

export type TireType = "dry" | "wet";

// In-race instance of a car
export type CarInstance = {
    id: string;
    driverId: string;
    baseCar: CarTemplate;
    modifiers: AttributeModifier[];
    components: CarComponents;
    tireType: TireType;
    status: {
        incidents: string[];
    };
    componentHPModifiers: ComponentHPModifier[]; // ← new
};

// Driver stuff:
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

export type DriverRaw = {
    id: string;
    name: string;
    attributes: DriverAttributes;
    car: string;           // just the car ID here
    team: string;
    homeTrackId?: string;
    carNumber: number;
    traits: DriverTrait[];
    championshipPoints?: number;
};

export type GameDriver = Omit<DriverRaw, "car"> & {
    car: CarInstance;      // now the full object
    isNPC: boolean;
    player?: string;       // lowercase for consistency
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

export type TrackModifierCondition =
    | "qualification"
    | "wet"
    | "finalLaps"
    | "wheelToWheel"
    | "hotWeather"
    | "earlyRace";

export type TrackModifier = {
    condition: TrackModifierCondition | TrackModifierCondition[];
    mod: Partial<CarAttributes>;
    description?: string;
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
    dryChance: number;          // 0-100
    hotChance: number;          // 0-100
    coldChance: number;         // 0-100
    dustyChance: number;        // 0-100
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
    modifiers?: TrackModifier[];
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
/*
export interface RaceCard extends Card {
  effect: RaceEffect;
  // maybe later: modifiers: AttributeModifier[]
}
 */
export type IncidentEffect =
    | "spin"             // Lose time + places; also reduces qualifying potential
    | "overheat"         // Forced to defend next turn (-1 pace, +1 defend)
    | "loseHandling"     // -1 to the car's handling attribute this round
    | "loseSpeed"        // -1 to the car's speed attribute
    | "loseComponentHP"  // Lose 1 HP on a component (e.g., brakes, engine); 0 HP is dangerous
    | "loseSetup"        // Lose setup advantage; may affect pace or control depending on phase
    | "contact"          // risk for me and for closest rival
    | "crash"           // this is insane, but it happens

export type TrackCondition = "hot" | "cold" | "wet" | "dry" | "dust"  // the last one is for cards

export type TrackConditionChances = {
    rain: number;       // 0–100
    dry: number;        // 0–100
    heat: number;       // 0–100
    cold: number        // 0–100
    dust: number;       // 0–100
}

export type RaceEffect =
    | { type: "track"; condition: TrackCondition }
    | { type: "trackConditionChange" }      // <-- special trigger, not a condition
    | { type: "yellowFlag" }                // close one or more overtaking zones, forced slow down
    | { type: "oilSpill" };                 // close one overtakig zone and less grip/handling, increased risk

export interface RaceCard extends Card {
    effect: RaceEffect;
    // Optional: detailed modifiers can be added later, depending on the card
}

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

// setup focus for player
export type SetupFocus =
    | "rain"
    | "qualification"
    | "lateSprint"
    | "handling"
    | "topSpeed"
    | "reliability"
    | "wheelToWheel";



