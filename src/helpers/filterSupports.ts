import { Support } from "types/support";
import { SupportFilterState } from "reducers/supportFilters";
import { BrowserSettings } from "reducers/browser";
import { createDateObject } from "./dates";
import { sortBy } from "./utils";

export function filterSupports(
    supports: Support[],
    filters: SupportFilterState,
    searchValue: string,
    sortSettings: BrowserSettings
) {
    let supps = [...supports];
    if (filters.specialty.length > 0) {
        supps = supps.filter((supp) =>
            filters.specialty.includes(supp.specialty)
        );
    }
    if (filters.rarity.length > 0) {
        supps = supps.filter((supp) => filters.rarity.includes(supp.rarity));
    }
    if (searchValue !== "") {
        supps = supps.filter(
            (supp) =>
                supp.name
                    .toLocaleLowerCase()
                    .includes(searchValue.toLocaleLowerCase()) ||
                supp.title
                    .toLocaleLowerCase()
                    .includes(searchValue.toLocaleLowerCase())
        );
    }

    const reverse = sortSettings.sortDirection === "desc";

    switch (sortSettings.sortBy) {
        case "name":
            supps = supps.sort(
                (a, b) =>
                    a.name.localeCompare(b.name) ||
                    sortBy(
                        Specialty[b.specialty],
                        Specialty[a.specialty],
                        reverse
                    ) ||
                    sortBy(b.id, a.id, !reverse)
            );
            if (reverse) {
                supps = supps.reverse();
            }
            break;
        case "specialty":
            supps = supps.sort(
                (a, b) =>
                    sortBy(
                        Specialty[b.specialty],
                        Specialty[a.specialty],
                        reverse
                    ) ||
                    sortBy(a.rarity, b.rarity) ||
                    sortBy(b.id, a.id)
            );
            break;
        case "rarity":
            supps = supps.sort(
                (a, b) =>
                    sortBy(a.rarity, b.rarity, reverse) ||
                    sortBy(Specialty[b.specialty], Specialty[a.specialty]) ||
                    sortBy(b.id, a.id)
            );
            break;
        case "release":
            supps = supps.sort(
                (a, b) =>
                    sortBy(
                        createDateObject({
                            date: a.release.jp,
                        }).obj.getTime(),
                        createDateObject({
                            date: b.release.jp,
                        }).obj.getTime(),
                        reverse
                    ) ||
                    sortBy(b.rarity, a.rarity, !reverse) ||
                    sortBy(b.id, a.id)
            );
            break;
    }

    return supps;
}

enum Specialty {
    "Speed",
    "Stamina",
    "Power",
    "Guts",
    "Wit",
    "Pal",
    "Group",
}
