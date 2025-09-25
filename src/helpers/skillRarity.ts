import { SkillRarity } from "types/_common";

export function getSkillRarityColor(rarity: SkillRarity) {
    switch (rarity) {
        case 1:
            return "none";
        case 2:
            return "linear-gradient(to right, rgb(255, 255, 239), rgb(255, 190, 38) 50%)";
        case 3:
        case 4:
        case 5:
            return "linear-gradient(to right, rgb(239, 255, 214) 0%, rgb(189, 219, 255) 50%, rgb(255, 186, 231) 100%)";
        case 6:
            return "linear-gradient(to right, rgb(255, 238, 239), rgb(255, 154, 211))";
    }
}
