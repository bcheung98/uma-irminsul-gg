import { Rarity } from "./_common";

export interface Skill {
    id: number;
    icon: number;
    name: string;
    description: {
        global: SkillDescription;
        jp: SkillDescription;
    };
    unique?: number;
    rarity: Rarity;
    unlock?: Rarity;
    activation: string;
    cost: number;
    conditions: string;
    duration: string;
}

interface SkillDescription {
    short: string;
    detailed: string;
}
