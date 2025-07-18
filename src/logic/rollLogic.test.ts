import {rollDice} from "./rollLogic";
import {setupThresholds} from "./setUpHelper";
import {io} from "../io/terminal/io";


export function testSetupDistribution(
    iterations: number,
    driverMod = 0,
    carMod = 0
) {
    const counts: Record<string, number> = {};

    for (let i = 0; i < iterations; i++) {
        const rollTotal = rollDice() + driverMod + carMod;

        let matchedResult: number[] | null = null;
        for (const { threshold, result } of setupThresholds) {
            if (rollTotal >= threshold) {
                matchedResult = result;
                break;
            }
        }

        const key = matchedResult ? matchedResult.join(",") : "0,0,0";
        counts[key] = (counts[key] || 0) + 1;
    }

    const distribution = Object.entries(counts).map(([key, count]) => ({
        result: key.split(",").map(Number),
        count,
        percent: (count / iterations) * 100,
    }));

    return distribution;
}




test("distribution test", () => {
    const iterations = 100_000;
    const driverMod = 1;
    const carMod = 2;

    const distribution = testSetupDistribution(iterations, driverMod, carMod);

    distribution.forEach(({ result, count, percent }) => {
        io.debug(`Result [${result.join(",")}] : ${count} times (${percent.toFixed(2)}%)`);
    });

    // Optional: Add some basic expectations, e.g. total count equals iterations
    const totalCount = distribution.reduce((sum, d) => sum + d.count, 0);
    expect(totalCount).toBe(iterations);
});
