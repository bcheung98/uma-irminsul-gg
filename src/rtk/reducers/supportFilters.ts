import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { objectKeys } from "helpers/utils";
import { Rarity, Specialty } from "types/_common";

export interface SupportFilterState {
    rarity: Rarity[];
    specialty: Specialty[];
}

const initialState: SupportFilterState = {
    rarity: [],
    specialty: [],
};

export const supportFilterSlice = createSlice({
    name: "supportFilters",
    initialState,
    reducers: {
        setRarity: (state, action: PayloadAction<Rarity[]>) => {
            state.rarity = action.payload;
        },
        setSpecialty: (state, action: PayloadAction<Specialty[]>) => {
            state.specialty = action.payload;
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

export const { setRarity, setSpecialty, clearFilters } =
    supportFilterSlice.actions;

export const { selectSupportFilters, activeSupportFilters } =
    supportFilterSlice.selectors;

export default supportFilterSlice.reducer;
