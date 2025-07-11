import {interactiveGame} from "./game/game";


interactiveGame().catch(err => {
    console.error('Error running game:', err);
});