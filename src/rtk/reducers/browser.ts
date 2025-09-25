import { PayloadAction, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { startAppListening } from "helpers/hooks";

export type SortBy = "name" | "rarity" | "specialty" | "type" | "release";
export type SortDirection = "asc" | "desc";
export type View = "icon" | "card" | "table";

export interface BrowserSettings {
    sortBy: SortBy;
    sortDirection: SortDirection;
    view: View;
}

export interface BrowserState {
    characters: BrowserSettings;
    supports: BrowserSettings;
    skills: BrowserSettings;
}

export type SortType = keyof BrowserState;

const defaultSettings: BrowserSettings = {
    sortBy: "release",
    sortDirection: "asc",
    view: "icon",
};

const storedSettings = localStorage.getItem("browser") || "{}";
const {
    characters = defaultSettings,
    supports = { sortBy: "specialty", sortDirection: "asc", view: "icon" },
    skills = { sortBy: "type", sortDirection: "asc", view: "icon" },
} = JSON.parse(storedSettings);

const initialState: BrowserState = {
    characters: characters,
    supports: supports,
    skills: skills,
};

export const browserSlice = createSlice({
    name: "browser",
    initialState,
    reducers: {
        setSortBy: (
            state,
            action: PayloadAction<{ type: SortType; sortBy: SortBy }>
        ) => {
            state[action.payload.type].sortBy = action.payload.sortBy;
        },
        setSortDirection: (
            state,
            action: PayloadAction<{
                type: SortType;
                sortDirection: SortDirection;
            }>
        ) => {
            state[action.payload.type].sortDirection =
                action.payload.sortDirection;
        },
        setBrowserView: (
            state,
            action: PayloadAction<{ type: SortType; view: View }>
        ) => {
            state[action.payload.type].view = action.payload.view;
        },
    },
    selectors: {
        selectBrowserSettings: (state): BrowserState => state,
    },
});

export const { setSortBy, setSortDirection, setBrowserView } =
    browserSlice.actions;

export const { selectBrowserSettings } = browserSlice.selectors;

export default browserSlice.reducer;

startAppListening({
    matcher: isAnyOf(setSortBy, setSortDirection, setBrowserView),
    effect: (_, state) => {
        const data = JSON.stringify(state.getState().browser);
        localStorage.setItem("browser", data);
    },
});
