import { createAsyncThunk } from "@reduxjs/toolkit";
import { Character } from "types/character";

export type LoadingStatus = "idle" | "pending" | "success" | "error";

// https://api.irminsul.gg/uma/characters.json
const charactersURL = "http://localhost:3000/characters";

export const fetchCharacters = createAsyncThunk(
    "GET/characters",
    async (): Promise<Character[]> => {
        const response = await fetch(charactersURL);
        return await response.json();
    }
);
