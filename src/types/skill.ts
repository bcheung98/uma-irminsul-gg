import { Rarity } from "./_common";
import { EventOutcome } from "./event";
import { Version } from "./version";

export interface SkillProps {
    skill: Skill;
}

export interface Skill {
    id: number;
    icon: number;
    name: Version;
    description: Version;
    unique?: number;
    rarity: Rarity;
    unlock?: Rarity;
    activation: string;
    cost: number;
    conditions: SkillCondition[];
    evo?: SkillEvo;
    tags: string[];
    versions?: (number | string)[];
    geneVersion: SkillInherited;
}

export interface SkillInherited
    extends Omit<Skill, "unique" | "versions" | "geneVersion"> {
    inherited: boolean;
}

export interface SkillCondition {
    duration: string;
    precondition: string;
    condition: string;
}

export interface SkillEvo {
    old: number;
    evoConditions: EventOutcome[][];
}
