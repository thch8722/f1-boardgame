import {Team, Track} from "../../logic/types";

export const tracks1978: Track[] = [
    {
        "id": "argentine_gp",
        "name": "Autódromo Juan y Óscar Gálvez",
        "country": "Argentina",
        "eventDate": "1978-01-15",
        "baseLapTime": 104.2,
        "lapTimeFactor": 0.35,
        "attributes": {
            "laps": 52,
            "speedBias": 5,
            "technicality": 3,
            "rainChance": 15,
            "dryChance": 55,
            "hotChance": 25,
            "coldChance": 0,
            "dustyChance": 5,
            "prestige": 4,
            "wearFactor": 5
        },
        "overtakingZones": [
            {
                "name": "Curva 1",
                "difficulty": 4,
                "favours": "handling"
            },
            {
                "name": "Straight Backstretch",
                "difficulty": 3,
                "favours": "speed"
            }
        ]
    },
    {
        "id": "south_african_gp",
        "name": "Kyalami",
        "country": "South Africa",
        "eventDate": "1978-03-04",
        "baseLapTime": 90.0,
        "lapTimeFactor": 0.32,
        "attributes": {
            "laps": 78,
            "speedBias": 5,
            "technicality": 5,
            "rainChance": 20,
            "dryChance": 50,
            "hotChance": 20,
            "coldChance": 5,
            "dustyChance": 5,
            "prestige": 5,
            "wearFactor": 4
        },
        "overtakingZones": [
            {
                "name": "Turn 1",
                "difficulty": 5,
                "favours": "handling"
            },
            {
                "name": "Back Straight",
                "difficulty": 3,
                "favours": "speed"
            }
        ]
    },
    {
        "id": "brazilian_gp",
        "name": "Interlagos",
        "country": "Brazil",
        "eventDate": "1978-03-26",
        "baseLapTime": 95.5,
        "lapTimeFactor": 0.28,
        "attributes": {
            "laps": 40,
            "speedBias": 3,
            "technicality": 4,
            "rainChance": 30,
            "dryChance": 45,
            "hotChance": 20,
            "coldChance": 0,
            "dustyChance": 5,
            "prestige": 5,
            "wearFactor": 5
        },
        "overtakingZones": [
            {
                "name": "Curva do Sol",
                "difficulty": 5,
                "favours": "handling"
            },
            {
                "name": "Straight Before Senna S",
                "difficulty": 4,
                "favours": "speed"
            }
        ]
    },
    {
        "id": "spanish_gp",
        "name": "Jarama",
        "country": "Spain",
        "eventDate": "1978-04-02",
        "baseLapTime": 89.0,
        "lapTimeFactor": 0.30,
        "attributes": {
            "laps": 75,
            "speedBias": 2,
            "technicality": 4,
            "rainChance": 10,
            "dryChance": 55,
            "hotChance": 30,
            "coldChance": 0,
            "dustyChance": 5,
            "prestige": 3,
            "wearFactor": 5
        },
        "overtakingZones": [
            {
                "name": "Turn 1",
                "difficulty": 5,
                "favours": "handling"
            },
            {
                "name": "Back Straight",
                "difficulty": 4,
                "favours": "speed"
            }
        ]
    },
    {
        "id": "monaco_gp",
        "name": "Monaco",
        "country": "Monaco",
        "eventDate": "1978-05-07",
        "baseLapTime": 75.5,
        "lapTimeFactor": 0.45,
        "attributes": {
            "laps": 76,
            "speedBias": 1,
            "technicality": 5,
            "rainChance": 20,
            "dryChance": 50,
            "hotChance": 10,
            "coldChance": 15,
            "dustyChance": 5,
            "prestige": 7,
            "wearFactor": 2
        },
        "overtakingZones": [
            {
                "name": "Mirabeau",
                "difficulty": 7,
                "favours": "handling"
            },
            {
                "name": "Portier",
                "difficulty": 7,
                "favours": "handling"
            }
        ]
    },
    {
        "id": "swedish_gp",
        "name": "Anderstorp",
        "country": "Sweden",
        "eventDate": "1978-06-11",
        "baseLapTime": 88.0,
        "lapTimeFactor": 0.34,
        "attributes": {
            "laps": 70,
            "speedBias": 4,
            "technicality": 3,
            "rainChance": 30,
            "dryChance": 45,
            "hotChance": 10,
            "coldChance": 10,
            "dustyChance": 5,
            "prestige": 2,
            "wearFactor": 3
        },
        "overtakingZones": [
            {
                "name": "Turn 1",
                "difficulty": 3,
                "favours": "handling"
            },
            {
                "name": "Back Straight",
                "difficulty": 3,
                "favours": "speed"
            }
        ]
    },
    {
        "id": "french_gp",
        "name": "Paul Ricard",
        "country": "France",
        "eventDate": "1978-06-25",
        "baseLapTime": 90.0,
        "lapTimeFactor": 0.31,
        "attributes": {
            "laps": 54,
            "speedBias": 4,
            "technicality": 4,
            "rainChance": 20,
            "dryChance": 50,
            "hotChance": 20,
            "coldChance": 5,
            "dustyChance": 5,
            "prestige": 5,
            "wearFactor": 5
        },
        "overtakingZones": [
            {
                "name": "Signes",
                "difficulty": 4,
                "favours": "speed"
            },
            {
                "name": "Virage du Pont",
                "difficulty": 4,
                "favours": "handling"
            }
        ]
    },
    {
        "id": "british_gp",
        "name": "Brands Hatch",
        "country": "UK",
        "eventDate": "1978-07-09",
        "baseLapTime": 92.0,
        "lapTimeFactor": 0.29,
        "attributes": {
            "laps": 76,
            "speedBias": 3,
            "technicality": 4,
            "rainChance": 35,
            "dryChance": 45,
            "hotChance": 10,
            "coldChance": 5,
            "dustyChance": 5,
            "prestige": 6,
            "wearFactor": 5
        },
        "overtakingZones": [
            {
                "name": "Paddock Hill Bend",
                "difficulty": 4,
                "favours": "handling"
            },
            {
                "name": "Druids",
                "difficulty": 3,
                "favours": "handling"
            }
        ]
    },
    {
        "id": "german_gp",
        "name": "Hockenheim",
        "country": "Germany",
        "eventDate": "1978-07-23",
        "baseLapTime": 92.0,
        "lapTimeFactor": 0.30,
        "attributes": {
            "laps": 45,
            "speedBias": 5,
            "technicality": 3,
            "rainChance": 25,
            "dryChance": 50,
            "hotChance": 15,
            "coldChance": 5,
            "dustyChance": 5,
            "prestige": 4,
            "wearFactor": 5
        },
        "overtakingZones": [
            {
                "name": "Hairpin",
                "difficulty": 3,
                "favours": "handling"
            },
            {
                "name": "Long Straight",
                "difficulty": 2,
                "favours": "speed"
            }
        ]
    },
    {
        "id": "austrian_gp",
        "name": "Österreichring",
        "country": "Austria",
        "eventDate": "1978-08-13",
        "baseLapTime": 91.0,
        "lapTimeFactor": 0.31,
        "attributes": {
            "laps": 54,
            "speedBias": 4,
            "technicality": 3,
            "rainChance": 30,
            "dryChance": 45,
            "hotChance": 15,
            "coldChance": 5,
            "dustyChance": 5,
            "prestige": 4,
            "wearFactor": 4
        },
        "overtakingZones": [
            {
                "name": "Turn 1",
                "difficulty": 4,
                "favours": "handling"
            },
            {
                "name": "Back Straight",
                "difficulty": 3,
                "favours": "speed"
            }
        ]
    },
    {
        "id": "italian_gp",
        "name": "Monza",
        "country": "Italy",
        "eventDate": "1978-09-10",
        "baseLapTime": 90.5,
        "lapTimeFactor": 0.30,
        "attributes": {
            "laps": 40,
            "speedBias": 7,
            "technicality": 1,
            "rainChance": 20,
            "dryChance": 60,
            "hotChance": 15,
            "coldChance": 3,
            "dustyChance": 2,
            "prestige": 7,
            "wearFactor": 4
        },
        "overtakingZones": [
            {
                "name": "Rettifilo chicane",
                "difficulty": 1,
                "favours": "handling"
            },
            {
                "name": "Parabolica",
                "difficulty": 2,
                "favours": "speed"
            }
        ]
    },
    {
        "id": "canadian_gp",
        "name": "Mosport Park",
        "country": "Canada",
        "eventDate": "1978-09-24",
        "baseLapTime": 95.0,
        "lapTimeFactor": 0.28,
        "attributes": {
            "laps": 80,
            "speedBias": 2,
            "technicality": 2,
            "rainChance": 25,
            "dryChance": 50,
            "hotChance": 15,
            "coldChance": 8,
            "dustyChance": 2,
            "prestige": 3,
            "wearFactor": 5
        },
        "overtakingZones": [
            {
                "name": "Turn 1",
                "difficulty": 4,
                "favours": "handling"
            },
            {
                "name": "Back Straight",
                "difficulty": 3,
                "favours": "speed"
            }
        ]
    },
    {
        "id": "us_gp_east",
        "name": "Watkins Glen",
        "country": "USA",
        "eventDate": "1978-10-01",
        "baseLapTime": 100.0,
        "lapTimeFactor": 0.27,
        "attributes": {
            "laps": 59,
            "speedBias": 4,
            "technicality": 4,
            "rainChance": 30,
            "dryChance": 50,
            "hotChance": 15,
            "coldChance": 3,
            "dustyChance": 2,
            "prestige": 5,
            "wearFactor": 5
        },
        "overtakingZones": [
            {
                "name": "Turn 1",
                "difficulty": 4,
                "favours": "handling"
            },
            {
                "name": "Back Straight",
                "difficulty": 3,
                "favours": "speed"
            }
        ]
    },
    {
        "id": "japanese_gp",
        "name": "Fuji Speedway",
        "country": "Japan",
        "eventDate": "1978-10-22",
        "baseLapTime": 92.0,
        "lapTimeFactor": 0.30,
        "attributes": {
            "laps": 73,
            "speedBias": 3,
            "technicality": 6,
            "rainChance": 35,
            "dryChance": 45,
            "hotChance": 10,
            "coldChance": 8,
            "dustyChance": 2,
            "prestige": 4,
            "wearFactor": 4
        },
        "overtakingZones": [
            {
                "name": "Turn 1",
                "difficulty": 3,
                "favours": "handling"
            },
            {
                "name": "Back Straight",
                "difficulty": 3,
                "favours": "speed"
            }
        ]
    },
    {
        id: "belgian_gp_zolder",
        name: "Zolder",
        country: "Belgium",
        eventDate: "1978-05-21",
        baseLapTime: 88.5,            // fits between Anderstorp (88) and Jarama (89)
        lapTimeFactor: 0.32,          // average technicality factor for medium track

        attributes: {
            laps: 70,                   // similar race length to Anderstorp, Jarama
            speedBias: 3,               // moderate speed emphasis, not extreme
            technicality: 5,            // quite technical track
            rainChance: 25,             // fair chance of rain (Belgium)
            dryChance: 50,              // still mostly dry races
            hotChance: 15,              // occasional warm days
            coldChance: 5,              // cooler days possible
            dustyChance: 5,             // low dust, but some dust possible
            prestige: 4,                // decent prestige, mid-range
            wearFactor: 4               // moderate wear on cars/tyres
        },

        overtakingZones: [
            {
                name: "Chicane",
                difficulty: 5,
                favours: "handling"
            },
            {
                name: "Straight Before Finish",
                difficulty: 3,
                favours: "speed"
            }
        ]
    },
    {
        id: "dutch_gp_zandvoort",
        name: "Zandvoort",
        country: "Netherlands",
        eventDate: "1978-08-27",
        baseLapTime: 90.2,           // fits with length & speed (similar to Zolder and Anderstorp)
        lapTimeFactor: 0.35,         // fairly technical with fast flowing curves

        attributes: {
            laps: 72,                  // typical race length for this track
            speedBias: 5,              // fast flowing, favors speed and flow
            technicality: 6,           // technical, but rhythmical track
            rainChance: 20,            // moderate rain probability due to coastal climate
            dryChance: 60,             // most races dry or mostly dry
            hotChance: 10,             // occasional warm days in summer
            coldChance: 5,             // some cooler days
            dustyChance: 5,            // low dust - sandy surroundings but usually damp
            prestige: 5,               // high prestige track in Europe
            wearFactor: 5              // moderate to high wear due to fast corners
        },

        overtakingZones: [
            {
                name: "Tarzan Corner",
                difficulty: 4,
                favours: "speed"
            },
            {
                name: "Haarbocht",
                difficulty: 3,
                favours: "handling"
            }
        ]
    }

]
