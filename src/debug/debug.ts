import {io} from "../io/terminal/io";
import {Track} from "../logic/types";


export function debugTrackModifiers(track: Track) {
    if (!track.modifiers || track.modifiers.length === 0) {
        io.print(`Track "${track.name}" has no active modifiers.`);
        return;
    }

    io.print(`Track "${track.name}" Active Modifiers:`);

    track.modifiers.forEach((modifier, i) => {
        const desc = modifier.description || `Modifier #${i + 1}`;
        const modAttrs = JSON.stringify(modifier.mod);
        const risk = modifier.riskMod !== undefined ? `Risk Modifier: ${modifier.riskMod}` : "";
        const cond = Array.isArray(modifier.condition)
            ? modifier.condition.join(", ")
            : modifier.condition;

        io.print(`- ${desc}`);
        io.print(`  Conditions: ${cond}`);
        io.print(`  Modifiers: ${modAttrs}`);
        if (risk) io.print(`  ${risk}`);
    });
}