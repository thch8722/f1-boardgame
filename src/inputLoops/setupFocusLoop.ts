import { io } from "../io/terminal/io";
import type { SetupFocus } from "../logic/types";

export const setupFocusLoop = async (): Promise<SetupFocus[]> => {
    io.print("Select up to 3 setup focuses for the car (type one or multiple, separated by space or comma, or 'done' to finish):");
    io.print(`Valid options: ${allowedSetupFocuses.join(", ")}`);

    const focuses: SetupFocus[] = [];

    while (focuses.length < 3) {
        const input = (await io.ask("> ")).trim().toLowerCase();

        if (input === "done") {
            io.print("Setup focus selection finished.");
            break;
        }

        // 🧹 Split by comma and/or space, trim each piece
        const inputs = input.split(/[, ]+/).map(str => str.trim()).filter(Boolean);

        for (const focusInput of inputs) {
            if (focusInput === "done") {
                break;
            }
            if (focuses.length >= 3) {
                io.print("You've selected the maximum of 3 focuses.");
                break;
            }

            if (!isValidSetupFocus(focusInput)) {
                io.print(`'${focusInput}' is not a valid setup focus.`);
                io.print(`Valid options are: ${allowedSetupFocuses.join(", ")}`);
                continue;
            }

            if (focuses.includes(focusInput as SetupFocus)) {
                io.print(`You've already selected '${focusInput}'. Try another.`);
                continue;
            }

            focuses.push(focusInput as SetupFocus);
            io.print(`Added '${focusInput}' to setup focuses.`);
        }

        if (focuses.length >= 3) {
            io.print("Setup focus selection finished.");
            break;
        }
    }

    return focuses;
};

const allowedSetupFocuses: SetupFocus[] = [
    "topspeed",
    "handling",
    "reliability",
    "rain",
    "latesprint",
    "qualification",
    "wheeltowheel"
];

const isValidSetupFocus = (focus: string): boolean =>
    allowedSetupFocuses.includes(focus as SetupFocus);
