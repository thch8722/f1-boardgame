import { getCurrentAttributes } from "./carLogic";
import type { CarInstance } from "./types";


/*
describe("getCurrentAttributes", () => {
    const baseCar = {
        id: "lotus78",
        name: "Lotus 78",
        team: "Lotus",
        attributes: {
            speed: 4,
            handling: 5,
            setupEase: 3,
        },
        components: {
            engine: 4,
            tyres: 4,
            brakes: 3,
            gearbox: 4,
        },
    };

    it("returns base attributes when no modifiers", () => {
        const car: CarInstance = {
            driverId: "driver1",
            baseCar,
            modifiers: [],
            components: { engine: 4, tyres: 4, brakes: 3, gearbox: 4 },
            status: { isRunning: true, incidents: [] },
        };

        const attrs = getCurrentAttributes(car);

        expect(attrs.speed).toBe(4);
        expect(attrs.handling).toBe(5);
        expect(attrs.setupEase).toBe(3);
    });

    it("applies modifiers correctly", () => {
        const car: CarInstance = {
            driverId: "driver1",
            id: "testcarId",
            baseCar,
            modifiers: [
                { source: "setup", mod: { speed: 1 }, description: "Good setup" },
                { source: "wear", mod: { handling: -2 }, description: "Tyre wear" },
            ],
            components: { engine: 4, tyres: 4, brakes: 3, gearbox: 2 },
            status: { isRunning: true, incidents: [] },
        };

        const attrs = getCurrentAttributes(car);

        expect(attrs.speed).toBe(5);      // 4 + 1
        expect(attrs.handling).toBe(3);   // 5 - 2
        expect(attrs.setupEase).toBe(3);  // unchanged
    });

    it("clamps attributes to minimum 1", () => {
        const car: CarInstance = {
            driverId: "driver1",
            baseCar,
            modifiers: [
                { source: "damage", mod: { handling: -10 }, description: "Heavy damage" },
            ],
            components: { engine: 4, tyres: 4, brakes: 3, gearbox: 4 },
            status: { isRunning: true, incidents: [] },
        };

        const attrs = getCurrentAttributes(car);

        expect(attrs.handling).toBe(1);
    });
});

 */
