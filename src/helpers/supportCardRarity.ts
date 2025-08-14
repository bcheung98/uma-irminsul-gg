import { Rarity } from "types/_common";

export function getSupportCardRarity(rarity: Rarity) {
    switch (rarity) {
        case 1:
        case 2:
        case 3:
            return "R";
        case 4:
            return "SR";
        case 5:
            return "SSR";
    }
}
