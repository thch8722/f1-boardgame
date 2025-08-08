import { io } from "../io/terminal/io";
import type { TireType } from "../logic/types"; // "dry" | "wet"

export const tyreSelectionLoop = async (): Promise<TireType> => {
    // Extract enum-like values from the union type
    const allowedTyres = ["dry", "wet"] as TireType[];

    io.print("Select tyre type for this session:");
    io.print(`Options: ${allowedTyres.join(", ")}`);

    while (true) {
        const input = (await io.ask("> ")).trim().toLowerCase();

        const tyre = allowedTyres.find(t => t.toLowerCase() === input);
        if (!tyre) {
            io.print(`'${input}' is not a valid tyre type.`);
            io.print(`Valid options are: ${allowedTyres.join(", ")}`);
            continue;
        }

        io.print(`Selected tyre: ${tyre}`);
        return tyre;
    }
};
