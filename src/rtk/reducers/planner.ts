import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { startAppListening } from "helpers/hooks";
import { range } from "helpers/utils";
import { Deck, EventViewerSettings } from "types/planner";

interface PlannerState {
    decks: Deck[];
    currentDeck: number;
    settings: EventViewerSettings;
}

const defaultDecks: Deck[] = range(1, 10).map((i) => ({
    name: `Deck ${i}`,
    character: null,
    scenario: 1,
    supports: [null, null, null, null, null, null, -1],
}));

const defaultSettings: EventViewerSettings = {
    showAll: false,
    expanded: false,
};

const storedDecks =
    localStorage.getItem("training-event-helper/decks") || "null";

const storedSettings =
    localStorage.getItem("training-event-helper/settings") || "null";

const initialState: PlannerState = {
    decks: storedDecks !== "null" ? JSON.parse(storedDecks) : defaultDecks,
    currentDeck: 0,
    settings:
        storedSettings !== "null"
            ? JSON.parse(storedSettings)
            : defaultSettings,
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
        setSettings: (state, action: PayloadAction<EventViewerSettings>) => {
            Object.assign(state, action.payload);
        },
        setDisplay: (state, action: PayloadAction<boolean>) => {
            state.settings.showAll = action.payload;
        },
        setExpanded: (state, action: PayloadAction<boolean>) => {
            state.settings.expanded = action.payload;
        },
    },
    selectors: {
        selectDecks: (state): Deck[] => state.decks,
        selectCurrentDeck: (state): Deck => state.decks[state.currentDeck],
        selectSettings: (state): EventViewerSettings => state.settings,
    },
});

export const {
    addCharacter,
    addSupport,
    addScenario,
    setCurrentDeck,
    setSettings,
    setExpanded,
    setDisplay,
} = plannerSlice.actions;

export const { selectDecks, selectCurrentDeck, selectSettings } =
    plannerSlice.selectors;

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

startAppListening({
    actionCreator: setSettings,
    effect: (action) => {
        localStorage.setItem(
            "training-event-helper/settings",
            JSON.stringify(action.payload)
        );
        window.dispatchEvent(new Event("storage"));
    },
});

window.addEventListener("storage", (event) => {
    if (event.key === "training-event-helper/settings") {
        window.location.reload();
    }
});
