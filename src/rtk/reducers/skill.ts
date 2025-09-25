import { createSlice } from "@reduxjs/toolkit";
import { startAppListening } from "helpers/hooks";
import { fetchSkills, LoadingStatus } from "rtk/fetchData";
import { Skill } from "types/skill";

export interface SkillState {
    status: LoadingStatus;
    skills: Skill[];
}

const storedSkills = localStorage.getItem("data/skills") || "null";

const initialState: SkillState = {
    status: "idle",
    skills: storedSkills !== "null" ? JSON.parse(storedSkills) : [],
};

export const skillSlice = createSlice({
    name: "skills",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSkills.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(fetchSkills.fulfilled, (state, action) => {
            let payload = action.payload;
            if (JSON.stringify(payload) !== storedSkills) {
                state.skills = payload;
            }
            state.status = "success";
        });
        builder.addCase(fetchSkills.rejected, (state) => {
            state.status = "error";
        });
    },
    selectors: {
        selectSkills: (state): Skill[] => state.skills,
    },
});

export const { selectSkills } = skillSlice.selectors;

export default skillSlice.reducer;

startAppListening({
    actionCreator: fetchSkills.fulfilled,
    effect: (action) => {
        const data = JSON.stringify(action.payload);
        if (data !== storedSkills) {
            localStorage.setItem("data/skills", data);
        }
    },
});
