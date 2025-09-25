import { Rarity, Specialty } from "./_common";
import { Version } from "./version";

export interface SupportProps {
    support: Support;
}

export interface Support {
    id: number;
    charID: number;
    name: string;
    title: string;
    rarity: Rarity;
    specialty: Specialty;
    perks: SupportPerks;
    supportEffects: SupportEffect[];
    hints: SupportHints;
    skillEvents: number[];
    skillEventsJP: number[];
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

export interface SupportPerks {
    effects: UniqueEffect[];
    unlock: number;
    description?: string[];
}

export interface SupportEffect {
    effect: string;
    values: number[];
    unlock: number;
}

export interface UniqueEffect {
    effect: string;
    value: number;
}

export interface SupportHints {
    stats: StatHint[];
    skills: number[];
}

export interface StatHint {
    type: string;
    value: number;
}
