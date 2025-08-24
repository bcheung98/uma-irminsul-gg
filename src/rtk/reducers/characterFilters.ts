import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { objectKeys } from "helpers/utils";
import { Aptitude, Rarity } from "types/_common";

export interface CharacterFilterState {
    rarity: Rarity[];
    aptitude: Aptitude[];
}

const initialState: CharacterFilterState = {
    rarity: [],
    aptitude: [],
};

export const characterFilterSlice = createSlice({
    name: "characterFilters",
    initialState,
    reducers: {
        setRarity: (state, action: PayloadAction<Rarity[]>) => {
            state.rarity = action.payload;
        },
        setAptitude: (state, action: PayloadAction<Aptitude[]>) => {
            state.aptitude = action.payload;
        },
        clearFilters: (
            state,
            action: PayloadAction<keyof CharacterFilterState | undefined>
        ) => {
            if (!action.payload) {
                return initialState;
            } else {
                state[action.payload] = [];
            }
        },
    },
    selectors: {
        selectCharacterFilters: (state): CharacterFilterState => state,
        activeCharacterFilters: (state): boolean =>
            objectKeys(state).filter((filter) => state[filter].length).length >
            0,
    },
});

export const { setRarity, setAptitude, clearFilters } =
    characterFilterSlice.actions;

export const { selectCharacterFilters, activeCharacterFilters } =
    characterFilterSlice.selectors;

export default characterFilterSlice.reducer;
