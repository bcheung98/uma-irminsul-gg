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

export function getSupportCardRarityColor(rarity: Rarity) {
    switch (rarity) {
        case 1:
        case 2:
        case 3:
            return "linear-gradient(to bottom right, #ffffffff 0%, #c4c4c4ff 25%, #8f8f8fff 50%, #c4c4c4ff 75%, #ffffffff 100%)";
        case 4:
            return "linear-gradient(to bottom right, #fad764ff 0%, #e4ba30ff 25%, #c4a235ff 50%, #e4ba30ff 75%, #fad764ff 100%)";
        case 5:
            return "linear-gradient(to bottom right, #e100ffff 0%, #2c90fc 50%, #b8fd33 90%, #fec837 100%)";
    }
}
