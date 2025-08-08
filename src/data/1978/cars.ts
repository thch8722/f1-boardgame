import { CarTemplate } from "../../logic/types";

export const cars1978: CarTemplate[] = [
    {
        id: "lotus_78",
        name: "Lotus 78",
        team: "Lotus",
        setupEase: 4,
        attributes: {
            speed: 6,
            handling: 5
        },
        components: { engine: 4, tyres: 4, brakes: 3, gearbox: 3 },
    },
    {
        id: "lotus_79",
        name: "Lotus 79",
        team: "Lotus",
        setupEase: 5,
        attributes: {
            speed: 6,
            handling: 6
        },
        components: { engine: 4, tyres: 4, brakes: 3, gearbox: 3 },
    },
    {
        id: "brabham_bt46",
        name: "Brabham BT46",
        team: "Brabham",
        setupEase: 4,
        attributes: {
            speed: 7,
            handling: 4
        },
        components: { engine: 3, tyres: 4, brakes: 3, gearbox: 3 },
    },
    {
        id: "brabham_bt46b",    // fan car monster
        name: "Brabham BT46B",
        team: "Brabham",
        setupEase: 4,
        attributes: {
            speed: 7,
            handling: 7

        },
        components: { engine: 3, tyres: 3, brakes: 3, gearbox: 3 },
    },
    {
        id: "wolf_wr6",
        name: "Wolf WR6",
        team: "Wolf",
        setupEase: 5,
        attributes: {
            speed: 5,
            handling: 4
        },
        components: { engine: 4, tyres: 4, brakes: 4, gearbox: 4 },
    },
    {
        id: "mclaren_m26",
        name: "McLaren M26",
        team: "McLaren",
        setupEase: 3,
        attributes: { speed: 5, handling: 4 },
        components: { engine: 4, tyres: 4, brakes: 3, gearbox: 3 },
    },
    {
        id: "mclaren_m26b",
        name: "McLaren M26B",
        team: "McLaren",
        setupEase: 4,
        attributes: {
            speed: 6,
            handling: 4
        },
        components: { engine: 4, tyres: 4, brakes: 3, gearbox: 4 },
    },
    {
        id: "tyrrell_008",
        name: "Tyrrell 008",
        team: "Tyrrell",
        setupEase: 4,
        attributes: {
            speed: 4,
            handling: 5

        },
        components: { engine: 3, tyres: 3, brakes: 3, gearbox: 4 },
    },
    {
        id: "ligier_js7",
        name: "Ligier JS7",
        team: "Ligier",
        setupEase: 3,
        attributes: { speed: 4, handling: 3},
        components: { engine: 3, tyres: 4, brakes: 3, gearbox: 3 },
    },
    {
        id: "renault_rs01",
        name: "Renault RS01",
        team: "Renault",
        setupEase: 2,
        attributes: {
            speed: 7,
            handling: 2
        },
        components: { engine: 2, tyres: 3, brakes: 4, gearbox: 3 },
    },
    {
        id: "ferrari_312t3",
        name: "Ferrari 312 T3",
        team: "Ferrari",
        setupEase: 4,
        attributes: {
            speed: 7,
            handling: 4
        },
        components: { engine: 5, tyres: 4, brakes: 4, gearbox: 5 },
    },
    {
        id: "shadow_dn8",
        name: "Shadow DN8",
        team: "Shadow",
        setupEase: 2,
        attributes: {
            speed: 4,
            handling: 2
        },
        components: { engine: 3, tyres: 3, brakes: 3, gearbox: 3 },
    },
    {
        id: "ensign_n177",
        name: "Ensign N177",
        team: "Ensign",
        setupEase: 2,
        attributes: {
            speed: 3,
            handling: 3
        },
        components: { engine: 3, tyres: 3, brakes: 2, gearbox: 2 },
    },
    {
        id: "surtees_ts19",
        name: "Surtees TS19",
        team: "Surtees",
        setupEase: 2,
        attributes: {
            speed: 3,
            handling: 3
        },
        components: { engine: 2, tyres: 3, brakes: 3, gearbox: 2 },
    },
    {
        id: "fittipaldi_f4a",
        name: "Fittipaldi F4A",
        team: "fittipaldi",
        setupEase: 3,
        attributes: {
            speed: 3,
            handling: 3
        },
        components: { engine: 3, tyres: 3, brakes: 3, gearbox: 2 },
    },
    {
        id: "williams_fw06",
        name: "Williams FW06",
        team: "williams",
        setupEase: 4,
        attributes: {
            speed: 3,
            handling: 4
        },
        components: { engine: 3, tyres: 3, brakes: 3, gearbox: 3 },
    },
    {
        id: "lotus_77",
        name: "Lotus 77",
        team: "Rebaque racing",
        setupEase: 2,
        attributes: {
            speed: 3,
            handling: 2
        },
        components: { engine: 3, tyres: 3, brakes: 3, gearbox: 3 },
    },
    {
        id: "arrows_a1",
        name: "Arrows A1",
        team: "arrows",
        setupEase: 3,
        attributes: {
            speed: 2,
            handling: 3
        },
        components: { engine: 3, tyres: 3, brakes: 3, gearbox: 3 },
    },
    {
        id: "ats_hs01",
        name: "ATS HS01",
        team: "ats",
        setupEase: 2, // tough car to dial in
        attributes: {
            speed: 1,     // poor straight-line speed
            handling: 2   // somewhat better due to nimbleness, but still weak
        },
        components: {
            engine: 2,    // old Ford-Cosworth DFV, unreliable in this setup
            tyres: 2,     // Goodyear but little factory support
            brakes: 2,    // nothing special
            gearbox: 2    // fragile
        }
    },
    {
        id: "theodore_tr1",
        name: "Theodore TR1",
        team: "theodore",
        setupEase: 1, // very hard to dial in — famously unstable
        attributes: {
            speed: 1,      // slowest on the grid
            handling: 2    // unpredictable under pressure
        },
        components: {
            engine: 2,     // standard DFV engine but unreliable install
            tyres: 2,      // inconsistent grip
            brakes: 2,     // nothing special, sometimes overheating
            gearbox: 2     // known to be a weak link under stress
        }
    },
    {
        id: "theodore_wr3",
        name: "Theodore-Wolf WR3",
        team: "theodore",
        setupEase: 3, // Not easy to set up (it's old), but more predictable than the TR1
        attributes: {
            speed: 3,      // Decent, because it was once a front-running car
            handling: 3    // Balanced but dated, harder to recover if pushed
        },
        components: {
            engine: 3,     // DFV standard — clean install, but aging
            tyres: 3,      // Likely running basic Goodyears, not the latest spec
            brakes: 2,     // Older but stable if not overheated
            gearbox: 2     // Weak point — aging, not built for wear
        }
    }



];
