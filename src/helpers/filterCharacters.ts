import { Character } from "types/character";
import { CharacterFilterState } from "reducers/characterFilters";
import { BrowserSettings } from "reducers/browser";
import { createDateObject } from "./dates";
import { sortBy } from "./utils";

export function filterCharacters(
    characters: Character[],
    filters: CharacterFilterState,
    searchValue: string,
    sortSettings: BrowserSettings
) {
    let chars = [...characters];
    if (filters.rarity.length > 0) {
        chars = chars.filter((char) => filters.rarity.includes(char.rarity));
    }
    if (filters.aptitude.length > 0) {
        chars = chars.filter((character) => {
            const aptitudes: string[] = [];
            Object.values(character.aptitude).forEach((values) =>
                Object.entries(values).forEach(
                    ([key, value]) => value === "A" && aptitudes.push(key)
                )
            );
            return filters.aptitude.every((f) =>
                aptitudes.includes(f.toLowerCase())
            );
        });
    }
    if (searchValue !== "") {
        chars = chars.filter(
            (char) =>
                char.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                char.title.toLowerCase().includes(searchValue.toLowerCase())
        );
    }

    const reverse = sortSettings.sortDirection === "desc";

    switch (sortSettings.sortBy) {
        case "name":
            chars = chars.sort(
                (a, b) =>
                    a.name.localeCompare(b.name) ||
                    a.title.localeCompare(b.title)
            );
            if (reverse) {
                chars = chars.reverse();
            }
            break;
        case "rarity":
            chars = chars.sort(
                (a, b) =>
                    sortBy(a.rarity, b.rarity, reverse) || sortBy(b.id, a.id)
            );
            break;
        case "release":
            chars = chars.sort(
                (a, b) =>
                    sortBy(
                        createDateObject({
                            date: a.release.global,
                        }).obj.getTime(),
                        createDateObject({
                            date: b.release.global,
                        }).obj.getTime(),
                        reverse
                    ) ||
                    sortBy(b.rarity, a.rarity, !reverse) ||
                    sortBy(b.id, a.id)
            );
            break;
    }

    return chars;
}
