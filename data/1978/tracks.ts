import {Team, Track} from "../../logic/types";

export const tracks1978: Track[] = [
    {
        "id": "argentine_gp",
        "name": "Buenos Aires",
        "country": "Argentina",
        "eventDate": "1978-01-15",
        "attributes": {
            "laps": 52,
            "speedBias": 5,
            "technicality": 3,
            "rainChance": 25,
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
        "attributes": {
            "laps": 78,
            "speedBias": 5,
            "technicality": 5,
            "rainChance": 20,
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
        "attributes": {
            "laps": 40,
            "speedBias": 3,
            "technicality": 4,
            "rainChance": 35,
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
        "attributes": {
            "laps": 75,
            "speedBias": 2,
            "technicality": 4,
            "rainChance": 30,
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
        "attributes": {
            "laps": 75,
            "speedBias": 1,
            "technicality": 5,
            "rainChance": 35,
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
        "attributes": {
            "laps": 70,
            "speedBias": 4,
            "technicality": 3,
            "rainChance": 20,
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
        "attributes": {
            "laps": 54,
            "speedBias": 4,
            "technicality": 4,
            "rainChance": 25,
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
        "attributes": {
            "laps": 76,
            "speedBias": 3,
            "technicality": 4,
            "rainChance": 30,
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
        "attributes": {
            "laps": 45,
            "speedBias": 5,
            "technicality": 3,
            "rainChance": 25,
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
        "attributes": {
            "laps": 54,
            "speedBias": 4,
            "technicality": 3,
            "rainChance": 20,
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
        "attributes": {
            "laps": 40,
            "speedBias": 7,
            "technicality": 1,
            "rainChance": 25,
            "prestige": 7,
            "wearFactor": 4
        },
        "overtakingZones": [
            {
                "name": "Curva Grande",
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
        "attributes": {
            "laps": 80,
            "speedBias": 2,
            "technicality": 2,
            "rainChance": 20,
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
        "attributes": {
            "laps": 59,
            "speedBias": 4,
            "technicality": 4,
            "rainChance": 25,
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
        "attributes": {
            "laps": 73,
            "speedBias": 3,
            "technicality": 6,
            "rainChance": 40,
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
    }
]
