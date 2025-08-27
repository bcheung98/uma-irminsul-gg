import { createSlice } from "@reduxjs/toolkit";
import { startAppListening } from "helpers/hooks";
import { fetchCharacterProfiles, LoadingStatus } from "rtk/fetchData";
import { CharacterProfile } from "types/character";

export interface CharacterProfileState {
    status: LoadingStatus;
    characterProfiles: CharacterProfile[];
}

const storedCharacterProfiles = localStorage.getItem("data/profiles") || "null";

const initialState: CharacterProfileState = {
    status: "idle",
    characterProfiles:
        storedCharacterProfiles !== "null"
            ? JSON.parse(storedCharacterProfiles)
            : [],
};

export const characterProfileSlice = createSlice({
    name: "characterProfiles",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCharacterProfiles.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(fetchCharacterProfiles.fulfilled, (state, action) => {
            state.characterProfiles = action.payload;
            state.status = "success";
        });
        builder.addCase(fetchCharacterProfiles.rejected, (state) => {
            state.status = "error";
        });
    },
    selectors: {
        selectCharacterProfiles: (state): CharacterProfile[] =>
            state.characterProfiles,
    },
});

export const { selectCharacterProfiles } = characterProfileSlice.selectors;

export default characterProfileSlice.reducer;

startAppListening({
    actionCreator: fetchCharacterProfiles.fulfilled,
    effect: (action) => {
        let payload = action.payload;
        const data = JSON.stringify(payload);
        if (data !== storedCharacterProfiles) {
            localStorage.setItem("data/profiles", data);
        }
    },
});
