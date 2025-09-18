import { createAsyncThunk } from "@reduxjs/toolkit";
import { Character, CharacterProfile } from "types/character";
import { Skill } from "types/skill";
import { Support } from "types/support";
import { Banner } from "types/banner";
import { EventData } from "types/event";

export type LoadingStatus = "idle" | "pending" | "success" | "error";

// https://api.irminsul.gg/uma/character-profiles.json
const characterProfilesURL =
    "https://api.irminsul.gg/uma/character-profiles.json";

// https://api.irminsul.gg/uma/characters.json
const charactersURL = "https://api.irminsul.gg/uma/characters.json";

// https://api.irminsul.gg/uma/supports.json
const supportsURL = "https://api.irminsul.gg/uma/supports.json";

// https://api.irminsul.gg/uma/skills.json
const skillsURL = "https://api.irminsul.gg/uma/skills.json";

const characterBannerURL = "https://api.irminsul.gg/uma/character-banners.json";
const supportBannerURL = "https://api.irminsul.gg/uma/support-banners.json";

export const fetchCharacterProfiles = createAsyncThunk(
    "GET/characterProfiles",
    async (): Promise<CharacterProfile[]> => {
        const response = await fetch(characterProfilesURL);
        return await response.json();
    }
);

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

export const fetchSkills = createAsyncThunk(
    "GET/skills",
    async (): Promise<Skill[]> => {
        const response = await fetch(skillsURL);
        return await response.json();
    }
);

export const fetchCharacterBanners = createAsyncThunk(
    "GET/characterBanners",
    async (): Promise<Banner[]> => {
        const response = await fetch(characterBannerURL);
        return await response.json();
    }
);

export const fetchSupportBanners = createAsyncThunk(
    "GET/supportBanners",
    async (): Promise<Banner[]> => {
        const response = await fetch(supportBannerURL);
        return await response.json();
    }
);

export const fetchEvents = createAsyncThunk(
    "GET/events",
    async (params: { type: string; port?: number }): Promise<EventData[]> => {
        let url: string;
        if (params.port)
            // URL for localhost development
            url = `http://localhost:${params.port}/events-${params.type}`;
        else {
            url = `https://api.irminsul.gg/uma/events-${params.type}.json`;
        }
        const response = await fetch(url);
        return await response.json();
    }
);
