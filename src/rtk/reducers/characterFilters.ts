import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { objectKeys } from "helpers/utils";
import { Rarity } from "types/_common";

export interface CharacterFilterState {
    rarity: Rarity[];
}

const initialState: CharacterFilterState = {
    rarity: [],
};

export const characterFilterSlice = createSlice({
    name: "characterFilters",
    initialState,
    reducers: {
        setRarity: (state, action: PayloadAction<Rarity[]>) => {
            state.rarity = action.payload;
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

export const {
    setRarity,

    clearFilters,
} = characterFilterSlice.actions;

export const { selectCharacterFilters, activeCharacterFilters } =
    characterFilterSlice.selectors;

export default characterFilterSlice.reducer;
