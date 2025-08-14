import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { objectKeys } from "helpers/utils";
import { Rarity } from "types/_common";

export interface SupportFilterState {
    rarity: Rarity[];
}

const initialState: SupportFilterState = {
    rarity: [],
};

export const supportFilterSlice = createSlice({
    name: "supportFilters",
    initialState,
    reducers: {
        setRarity: (state, action: PayloadAction<Rarity[]>) => {
            state.rarity = action.payload;
        },

        clearFilters: (
            state,
            action: PayloadAction<keyof SupportFilterState | undefined>
        ) => {
            if (!action.payload) {
                return initialState;
            } else {
                state[action.payload] = [];
            }
        },
    },
    selectors: {
        selectSupportFilters: (state): SupportFilterState => state,
        activeSupportFilters: (state): boolean =>
            objectKeys(state).filter((filter) => state[filter].length).length >
            0,
    },
});

export const { setRarity, clearFilters } = supportFilterSlice.actions;

export const { selectSupportFilters, activeSupportFilters } =
    supportFilterSlice.selectors;

export default supportFilterSlice.reducer;
