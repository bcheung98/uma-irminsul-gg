import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { startAppListening } from "helpers/hooks";
import { range } from "helpers/utils";
import { Deck } from "types/planner";

interface PlannerState {
    decks: Deck[];
    currentDeck: number;
}

const defaultDecks: Deck[] = range(1, 6).map((i) => ({
    name: `Deck ${i}`,
    character: null,
    scenario: 1,
    supports: [null, null, null, null, null, null],
}));

const storedDecks =
    localStorage.getItem("training-event-helper/decks") || "null";

const initialState: PlannerState = {
    decks: storedDecks !== "null" ? JSON.parse(storedDecks) : defaultDecks,
    currentDeck: 0,
};

export const plannerSlice = createSlice({
    name: "planner",
    initialState,
    reducers: {
        addCharacter: (state, action: PayloadAction<number | null>) => {
            state.decks[state.currentDeck].character = action.payload;
        },
        addSupport: (
            state,
            action: PayloadAction<{ index: number; id: number | null }>
        ) => {
            state.decks[state.currentDeck].supports[action.payload.index] =
                action.payload.id;
        },
        addScenario: (state, action: PayloadAction<number | null>) => {
            state.decks[state.currentDeck].scenario = action.payload;
        },
        setCurrentDeck: (state, action: PayloadAction<number>) => {
            state.currentDeck = action.payload;
        },
    },
    selectors: {
        selectDecks: (state): Deck[] => state.decks,
        selectCurrentDeck: (state): Deck => state.decks[state.currentDeck],
    },
});

export const { addCharacter, addSupport, addScenario, setCurrentDeck } =
    plannerSlice.actions;

export const { selectDecks, selectCurrentDeck } = plannerSlice.selectors;

export default plannerSlice.reducer;

startAppListening({
    matcher: isAnyOf(addCharacter, addSupport, addScenario),
    effect: (_, state) => {
        const data = JSON.stringify(state.getState().planner.decks);
        if (data !== storedDecks) {
            localStorage.setItem("training-event-helper/decks", data);
        }
    },
});
