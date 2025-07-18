import {GameDriver, DriverRaw} from "../../logic/types";

export const drivers1978: DriverRaw[] = [
    {
        id: "niki_lauda",
        name: "Niki Lauda",
        nickname: "The Rat",
        attributes: {
            mechanicalFeel: 7,
            speed: 5,
            focus: 7,
            racecraft: 6,
            rainSkill: 3,
            bravery: 4
        },
        team: "brabham",
        car: "brabham_bt46_1",
        homeTrackId: "german_gp",
        carNumber: 1,
        traits: ["Cool and calm"]
    },
    {
        id: "john_watson",
        name: "John Watson",
        nickname: "Wattie",
        attributes: {
            mechanicalFeel: 6,  // +2
            speed: 5,           // +1
            focus: 4,           //  0
            racecraft: 6,       // +2
            rainSkill: 6,     // +3
            bravery: 5
        },
        team: "brabham",
        car: "brabham_bt46_2",
        homeTrackId: "british_gp",
        carNumber: 2,
        traits: ["Cool and calm"]
    },
    {
        id: "didier_pironi",
        name: "Didier Pironi",
        attributes: {
            mechanicalFeel: 4,  //  0
            speed: 7,           // +3
            focus: 5,           // +1
            racecraft: 6,       // +2
            rainSkill: 6,     // +1
            bravery: 6
        },team: "tyrrell",
        car: "tyrrell_008_1",
        homeTrackId: "french_gp",
        carNumber: 3,
        traits: ["Rookie", "Aggressive"]
    },
    {
        id: "patrick_depailler",
        name: "Patrick Depailler",
        attributes: {
            mechanicalFeel: 6,  // +2
            speed: 6,           // +2
            focus: 4,           //  0
            racecraft: 5,       // +1
            rainSkill: 6,     // +3
            bravery: 7
        },
        team: "tyrrell",
        car: "tyrrell_008_2",
        homeTrackId: "french_gp",
        carNumber: 4,
        traits: ["Showman"]
    },
    {
        id: "mario_andretti",
        name: "Mario Andretti",
        attributes: {
            mechanicalFeel: 7,  // +3
            speed: 6,           // +3
            focus: 6,           // +2
            racecraft: 6,       // +2
            rainSkill: 6,     // +3
            bravery: 4
        },
        team: "lotus",
        car: "lotus_79_1",   // Example chassis
        homeTrackId: "us_gp_east",
        carNumber: 5,
        traits: ["Cool and calm"]
    },
    {
        id: "ronnie_peterson",
        name: "Ronnie Peterson",
        nickname: "Superswede",
        attributes: {
            mechanicalFeel: 5,  // good, felt the car well
            speed: 7,           // raw speed king, top pace
            focus: 5,           // a bit wild, sometimes lost focus under pressure
            racecraft: 7,       // brilliant overtaking, aggressive style
            rainSkill: 5,     // good but not a chameleon
            bravery: 7
        },
        team: "lotus",
        car: "lotus_78_1",
        homeTrackId: "swedish_gp",
        carNumber: 6,
        traits: ["Showman"]
    },
    {
        id: "james_hunt",
        name: "James Hunt",
        nickname: "Hunt the Shunt",
        attributes: {
            mechanicalFeel: 6,  // felt the car well but sometimes pushed too hard
            speed: 6,           // quick and daring on the straights
            focus: 4,           // could be streaky, sometimes lost composure
            racecraft: 7,       // aggressive overtaker, no fear
            rainSkill: 5,     // decent at adjusting to conditions
            bravery: 6
        },
        team: "mclaren",
        car: "mclaren_m26_1",
        homeTrackId: "british_gp",
        carNumber: 7,
        traits: ["Showman", "Aggressive"]
    },
    {
        id: "patrick_tambay",
        name: "Patrick Tambay",
        attributes: {
            mechanicalFeel: 5,  // average feel for the car
            speed: 4,           // below top speed, but not slow
            focus: 3,           // struggles to keep concentration sometimes
            racecraft: 4,       // decent but not exceptional in overtakes or defense
            rainSkill: 4,     // difficulty adapting to changing conditions or setup
            bravery: 4
        },
        team: "mclaren",
        car: "mclaren_m26_2",
        homeTrackId: "french_gp",
        carNumber: 8,
        traits: ["Rookie"]
    },
    {
        id: "carlos_reutemann",
        name: "Carlos Reutemann",
        attributes: {
            mechanicalFeel: 6,  // excellent feedback and car setup insight
            speed: 6,           // very fast, especially in qualifying
            focus: 6,           // calm and composed under pressure
            racecraft: 6,       // smart overtaker, strategic
            rainSkill: 3,     // adjusts well to different conditions
            bravery: 3
        },
        team: "ferrari",
        car: "ferrari_312t3_1",
        homeTrackId: "italian_gp",
        carNumber: 11,
        traits: ["Cool and calm"]
    },
    {
        id: "gilles_villeneuve",
        name: "Gilles Villeneuve",
        nickname: "The Pilot",
        attributes: {
            mechanicalFeel: 6,  // great feel, though sometimes pushing limits
            speed: 7,           // blazing fast and fearless on the straights
            focus: 4,           // passionate but a bit wild, can be inconsistent
            racecraft: 7,       // aggressive overtaker and hard charger
            rainSkill: 5,     // sometimes struggles with changing conditions
            bravery: 7
        },
        team: "ferrari",
        car: "ferrari_312t3_2",
        homeTrackId: "canadian_gp",
        carNumber: 12,
        traits: ["Aggressive", "Rookie"]
    },
    {
        id: "jody_scheckter",
        name: "Jody Scheckter",
        attributes: {
            mechanicalFeel: 6,  // very good setup feel, helps car handling
            speed: 6,           // fast but not the flashiest
            focus: 6,           // mentally sharp and consistent
            racecraft: 6,       // solid race instincts and tactical
            rainSkill: 1,
            bravery: 5
        },
        team: "wolf",
        car: "wolf_wr6_1",
        homeTrackId: "south_african_gp",
        carNumber: 20,
        traits: ["Cool and calm", "Unpredictable"]
    },
    {
        id: "jacques_laffite",
        name: "Jacques Laffite",
        nickname: "Jacky",
        attributes: {
            mechanicalFeel: 6,   // good with car setup and feel
            speed: 6,            // quick and aggressive
            focus: 5,            // solid concentration
            racecraft: 6,        // clever and bold on track
            rainSkill: 4,      // handles different conditions well
            bravery: 4
        },
        team: "ligier",
        car: "ligier_js7_1",
        homeTrackId: "monaco_gp",
        carNumber: 26,
        traits: ["Cool and calm"]
    },
    {
        id: "jean_pierre_jabouille",
        name: "Jean-Pierre Jabouille",
        nickname: "Jabou",
        attributes: {
            mechanicalFeel: 7,   // excellent technical understanding, especially with turbo Renault
            speed: 5,            // decent pace but not among fastest
            focus: 5,            // good concentration
            racecraft: 5,        // competent but not overly aggressive
            rainSkill: 3,
            bravery: 3
        },
        team: "renault",
        car: "renault_rs01_1",
        homeTrackId: "french_gp",
        carNumber: 15,
        traits: ["Cool and calm"]
    },
    {
        id: "derek_daly",
        name: "Derek Daly",
        nickname: "Delirious Daly",
        attributes: {
            mechanicalFeel: 5,
            speed: 5,
            focus: 6,
            racecraft: 4,
            rainSkill: 3,
            bravery: 5
        },
        team: "ensign",
        car: "ensign_n177_1",
        homeTrackId: "british_gp",
        carNumber: 22,
        traits: ["Rookie"]
    },
    {
        id: "vittorio_brambilla",
        name: "Vittorio Brambilla",
        nickname: "The Monza Gorilla",
        attributes: {
            mechanicalFeel: 1,  // really struggled with car feel
            speed: 2,           // very low pace, barely competitive
            focus: 1,           // easily distracted, prone to mistakes
            racecraft: 2,       // weak wheel-to-wheel skills
            rainSkill: 6,     // poor at adjusting to conditions
            bravery: 6
        },
        team: "surtees",
        car: "surtees_ts19_1",
        homeTrackId: "italian_gp",
        carNumber: 19,
        traits: ["Rookie", "Aggressive", "Showman"]
    },
    {
        id: "riccardo_patrese",
        name: "Riccardo Patrese",
        nickname: "Pat",
        attributes: {
            mechanicalFeel: 2,  // still learning car feel, close to 1
            speed: 3,           // a bit slow for a rookie
            focus: 1,           // shaky nerves, very inconsistent
            racecraft: 2,       // still inexperienced in battles
            rainSkill: 4,     // learning to cope with changes
            bravery: 6
        },
        team: "arrows",
        car: "arrows_a1_1",
        homeTrackId: "italian_gp",
        carNumber: 35,
        traits: ["Rookie", "Unpredictable"]
    },
    {
        id: "emerson_fittipaldi",
        name: "Emerson Fittipaldi",
        nickname: "Emmo",
        attributes: {
            mechanicalFeel: 5,  // still good car sense but not razor sharp
            speed: 5,           // competitive but no longer blazing fast
            focus: 5,           // experienced but sometimes less sharp
            racecraft: 5,       // solid but no longer flawless
            rainSkill: 5,     // able to handle different conditions well
            bravery: 4
        },team: "fittipaldi",
        car: "fittipaldi_f4a_1",
        homeTrackId: "brazilian_gp",
        carNumber: 14,
        traits: ["Cool and calm"]
    },
    {
        id: "alan_jones",
        name: "Alan Jones",
        attributes: {
            mechanicalFeel: 6,  // solid car sense and setup feedback
            speed: 6,           // quick and aggressive on track
            focus: 4,           // sometimes emotional, can lose composure
            racecraft: 6,       // good overtaking and race instincts
            rainSkill: 4,     // decent at adjusting to changing conditions
            bravery: 6
        },
        team: "williams",
        car: "williams_fw06_1",
        homeTrackId: "british_gp",
        carNumber: 27,
        traits: ["Rookie", "Aggressive", "Stubborn"]
    },
    {
        id: "clay_regazzoni",
        name: "Clay Regazzoni",
        attributes: {
            mechanicalFeel: 6,  // good car feedback, veteran sense
            speed: 6,           // competitive pace, can push well
            focus: 5,           // generally steady, occasional lapses
            racecraft: 6,       // smart racer, good tactical sense
            rainSkill: 4,     // decent adapting to changing conditions
            bravery: 5
        },
        team: "shadow",
        car: "shadow_dn8_1",
        homeTrackId: "austrian_gp",
        carNumber: 17,
        traits: ["Aggressive", "Stubborn"]
    },
    {
        id: "hans_joachim_stuck",
        name: "Hans-Joachim Stuck",
        attributes: {
            mechanicalFeel: 2,  // struggles sometimes to get perfect car feedback
            speed: 5,           // decent pace but rarely outstanding
            focus: 3,           // concentration can waver under pressure
            racecraft: 3,       // not always sharp in wheel-to-wheel battles
            rainSkill: 5,     // slow to adjust to changing conditions
            bravery: 6
        },
        team: "shadow",
        car: "shadow_dn8_1",
        homeTrackId: "german_gp",
        carNumber: 16,
        traits: ["Showman", "Unpredictable"]
    },
    {
        id: "hector_rebaque",
        name: "Héctor Rebaque",
        nickname: "El Puma",
        attributes: {
            mechanicalFeel: 3,  // often struggled to get the car working perfectly
            speed: 3,           // below average outright pace
            focus: 3,           // sometimes inconsistent concentration
            racecraft: 3,       // limited overtaking and defensive skills
            rainSkill: 1,     // slow to react to changing conditions or setups
            bravery: 1
        },
        team: "rebaque",
        car: "lotus_77_1",
        homeTrackId: "british_gp",
        carNumber: 25,
        traits: ["Rookie"]
    }
]

