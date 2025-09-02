export type DeckData = number | null;

export type CardType = "character" | "support" | "scenario" | null;

export interface Deck {
    name: string;
    character: DeckData;
    scenario: DeckData;
    supports: [
        DeckData,
        DeckData,
        DeckData,
        DeckData,
        DeckData,
        DeckData,
        number
    ];
}
