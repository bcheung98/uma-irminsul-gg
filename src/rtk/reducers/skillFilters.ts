import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { objectKeys } from "helpers/utils";
import { Rarity } from "types/_common";

export interface SkillFilterState {
    rarity: Rarity[];
    conditions: string[];
}

const initialState: SkillFilterState = {
    rarity: [],
    conditions: [],
};

export const skillFilterSlice = createSlice({
    name: "skillFilters",
    initialState,
    reducers: {
        setRarity: (state, action: PayloadAction<Rarity[]>) => {
            let data = action.payload;
            if (data.includes(3)) {
                data.push(4, 5);
            } else {
                const index4 = data.indexOf(4);
                if (index4 > -1) {
                    data = data.splice(index4, -1);
                }
                const index5 = data.indexOf(5);
                if (index5 > -1) {
                    data = data.splice(index5, -1);
                }
            }
            state.rarity = data;
        },
        setConditions: (state, action: PayloadAction<string[]>) => {
            state.conditions = action.payload;
        },
        clearFilters: (
            state,
            action: PayloadAction<keyof SkillFilterState | undefined>
        ) => {
            if (!action.payload) {
                return initialState;
            } else {
                state[action.payload] = [];
            }
        },
    },
    selectors: {
        selectSkillFilters: (state): SkillFilterState => state,
        activeSkillFilters: (state): boolean =>
            objectKeys(state).filter((filter) => state[filter].length).length >
            0,
    },
});

export const { setRarity, setConditions, clearFilters } =
    skillFilterSlice.actions;

export const { selectSkillFilters, activeSkillFilters } =
    skillFilterSlice.selectors;

export default skillFilterSlice.reducer;
