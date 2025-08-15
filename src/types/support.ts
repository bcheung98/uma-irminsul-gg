import { Rarity, Specialty } from "./_common";
import { Version } from "./version";

export interface SupportProps {
    support: Support;
}

export interface Support {
    id: number;
    name: string;
    title: string;
    rarity: Rarity;
    specialty: Specialty;
    perks: {
        effects: SupportEffect[];
        unlock: number;
    };
    supportEffects: SupportEffect[];
    hints: SupportHints;
    skillEvents: (string | number)[];
    trainingEvents: {
        chain: string[];
        random: string[];
    };
    splash: {
        en: string;
        jp: string;
    };
    release: Version;
}

export interface SupportEffect {
    effect: string;
    values: string[];
    unlock?: number;
}

export interface SupportHints {
    stats: StatHint[];
    skills: (number | string)[];
}

export interface StatHint {
    type: string;
    value: number;
}
