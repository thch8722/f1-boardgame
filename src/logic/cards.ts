import { v4 as uuidv4 } from "uuid";
import {EventCard, IncidentCard, RaceCard} from "./types";
import {incidentCardTemplates} from "../data/cards/incidentCards";
import {eventCardTemplates} from "../data/cards/eventCards";
import {raceCardTemplates} from "../data/cards/raceCards";


export interface Card {
    id: string;
    type: "INCIDENT_CARD" | "EVENT_CARD" | "RACE_CARD"
    name: string;
    description: string;
}

export class CardDeck<T extends Card> {
    private drawPile: T[] = [];
    private discardPile: T[] = [];

    constructor(initialCards: T[]) {
        this.reset(initialCards);
    }

    private shuffle(cards: T[]): T[] {
        const result = [...cards];
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    }

    reset(cards: T[]) {
        this.drawPile = this.shuffle(cards);
        this.discardPile = [];
    }

    draw(): T {
        if (this.drawPile.length === 0) {
            if (this.discardPile.length === 0) {
                throw new Error("No cards left in deck or discard pile.");
            }
            this.drawPile = this.shuffle(this.discardPile);
            this.discardPile = [];
        }
        const card = this.drawPile.pop()!;
        return card;
    }

    discard(card: T) {
        this.discardPile.push(card);
    }
}



// Helper generic to build cards from templates
function buildCardsFromTemplates<
    T extends { effect: any; name: string; description: string; count: number },
    R extends Omit<T, "count"> & { id: string; type: Card["type"] }
>(templates: T[], type: Card["type"]): R[] {
    return templates.flatMap(template =>
        Array.from({ length: template.count }, () => {
            const { count, ...cardData } = template;
            return {
                id: uuidv4(),
                type,  // ✅ add this line!
                ...cardData,
            } as R;
        })
    );
}

// Build Incident Deck:
export function buildIncidentDeck(): CardDeck<IncidentCard> {
    const incidentCards = buildCardsFromTemplates<typeof incidentCardTemplates[number], IncidentCard>(
        incidentCardTemplates,
        "INCIDENT_CARD",
        );
    return new CardDeck(incidentCards);
}

// build event card deck:
export function buildEventDeck(): CardDeck<EventCard> {
    const eventCards = buildCardsFromTemplates<typeof eventCardTemplates[number], EventCard>(
        eventCardTemplates,
        "EVENT_CARD",
    );
    return new CardDeck(eventCards);
}

// build race card deck:
export function buildRaceCardDeck(): CardDeck<RaceCard> {
    const raceCards = buildCardsFromTemplates<typeof raceCardTemplates[number], RaceCard>(
        raceCardTemplates,
        "RACE_CARD"
    );
    return new CardDeck(raceCards);
}
