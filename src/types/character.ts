import { Rank, Rarity } from "./_common";
import { Version } from "./version";

export interface CharacterProps {
    character: Character;
}

export interface Character {
    id: number;
    charID: number;
    name: string;
    outfit?: string;
    title: string;
    rarity: Rarity;
    stats: CharacterStats;
    aptitude: CharacterAptitude;
    skills: CharacterSkills;
    materials: string[];
    release: Version;
}

export interface CharacterStats {
    speed: number[];
    stamina: number[];
    power: number[];
    guts: number[];
    wit: number[];
}

export interface CharacterAptitude {
    surface: CharacterAptitudeSurface;
    distance: CharacterAptitudeDistance;
    strategy: CharacterAptitudeStrategy;
}

export interface CharacterAptitudeSurface {
    turf: Rank;
    dirt: Rank;
}
export interface CharacterAptitudeDistance {
    sprint: Rank;
    mile: Rank;
    medium: Rank;
    long: Rank;
}
export interface CharacterAptitudeStrategy {
    front: Rank;
    pace: Rank;
    late: Rank;
    end: Rank;
}

export interface CharacterSkills {
    unique: (number | string)[];
    innate: (number | string)[];
    awakening: (number | string)[];
    event: (number | string)[];
    eventJP?: (number | string)[];
    evo: CharacterEvoSkill[];
}

export interface CharacterEvoSkill {
    new: number;
    old: number;
}

export interface CharacterProfile {
    id: number;
    name: string;
    nameJP: string;
    description: string;
    birthday: string;
    height: number;
    sizes: [number, number, number];
    voiceActors: {
        jp: string;
    };
}
