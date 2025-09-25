import {
    aptitude,
    raceStages,
    ranks,
    rarities,
    skillRarities,
    specialties,
} from "../data/common";

// Taken from:
// https://medium.com/xgeeks/typescript-utility-keyof-nested-object-fa3e457ef2b2
export type NestedKeyOf<T extends object> = {
    [K in keyof T & (string | number)]: T[K] extends object
        ? `${K}` | keyof T[K]
        : `${K}`;
}[keyof T & (string | number)];

export type Rarity = (typeof rarities)[number];
export type SkillRarity = (typeof skillRarities)[number];
export type Rank = (typeof ranks)[number];
export type Stat = Exclude<Specialty, "Pal" | "Group">;
export type Specialty = (typeof specialties)[number];

export type Aptitude = (typeof aptitude)[number];
export type RaceStage = (typeof raceStages)[number];
