import { createAsyncThunk } from "@reduxjs/toolkit";
import { Character } from "types/character";
import { Support } from "types/support";

export type LoadingStatus = "idle" | "pending" | "success" | "error";

// https://api.irminsul.gg/uma/characters.json
const charactersURL = "https://api.irminsul.gg/uma/characters.json";

// https://api.irminsul.gg/uma/supports.json
const supportsURL = "https://api.irminsul.gg/uma/supports.json";

export const fetchCharacters = createAsyncThunk(
    "GET/characters",
    async (): Promise<Character[]> => {
        const response = await fetch(charactersURL);
        return await response.json();
    }
);

export const fetchSupports = createAsyncThunk(
    "GET/supports",
    async (): Promise<Support[]> => {
        const response = await fetch(supportsURL);
        return await response.json();
    }
);
