import { Rarity, Specialty } from "./_common";

export interface Banner {
    id: number;
    start: string;
    end: string;
    startJP: string;
    endJP: string;
    rateUps: number[];
}

export type BannerType = "character" | "support";

export interface BannerOption {
    id: number;
    name: string;
    title: string;
    rarity: Rarity;
    specialty?: Specialty;
}

export interface BannerData extends Omit<Banner, "rateUps"> {
    rateUps: BannerOption[];
}
