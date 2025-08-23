import { BannerOption, BannerType } from "types/banner";
import { Character } from "types/character";
import { Support } from "types/support";

export function createBannerData(
    id: number,
    type: BannerType,
    characters: Character[],
    supports: Support[]
) {
    let data: BannerOption = {
        id: -1,
        name: "TBA",
        title: "TBA",
        rarity: 1,
    };
    if (type === "character") {
        let char = characters.find((char) => char.id === id);
        if (char) {
            data.id = char.id;
            data.name = char.name;
            data.title = char.title;
            data.rarity = char.rarity;
        }
    } else {
        let supp = supports.find((supp) => supp.id === id);
        if (supp) {
            data.id = supp.id;
            data.name = supp.name;
            data.title = supp.title;
            data.rarity = supp.rarity;
            data.specialty = supp.specialty;
        }
    }
    return data;
}
