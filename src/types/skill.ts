import { Rarity } from "./_common";

export interface Skill {
    id: string;
    name: string;
    description: {
        global: SkillDescription;
        jp: SkillDescription;
    };
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
