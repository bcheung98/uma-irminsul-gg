import { Rarity } from "types/_common";

export function getSkillRarityColor(rarity: Rarity) {
    switch (rarity) {
        case 1:
            return "none";
        case 2:
            return "linear-gradient(to left, rgba(255, 255, 205, 1), rgba(247, 195, 74, 1))";
        case 3:
        case 4:
        case 5:
            return "linear-gradient(to left, rgb(222, 255, 214) 0%, rgb(181, 215, 255) 50%, rgb(255, 175, 240) 100%)";
    }
}
