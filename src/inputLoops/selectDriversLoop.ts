// selectDriversLoop.ts
import {GameDriver} from "../logic/types";
import {io} from "../io/terminal/io";

export const selectDriversLoop = async (drivers: GameDriver[]) => {
    io.print("Select drivers to control. Type driver ID or name (or 'done' to finish):");

    while (true) {
        const input = (await io.ask("> ")).trim();

        if (input.toLowerCase() === "done") {
            io.print("Driver selection finished.");
            break;
        }

        const driver = drivers.find(
            d =>
                d.id.toLowerCase() === input.toLowerCase() ||
                d.name.toLowerCase() === input.toLowerCase()
        );

        if (!driver) {
            io.print(`Driver "${input}" not found, try again.`);
        } else {
            driver.isNPC = false;
            driver.player = "you";
            io.print(`You now control driver: ${driver.name}`);
        }
    }

    return drivers;
};