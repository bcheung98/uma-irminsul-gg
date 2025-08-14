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
    if (searchValue !== "") {
        supps = supps.filter(
            (char) =>
                char.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                char.title.toLowerCase().includes(searchValue.toLowerCase())
        );
    }

    const reverse = sortSettings.sortDirection === "desc";

    switch (sortSettings.sortBy) {
        case "name":
            supps = supps.sort(
                (a, b) =>
                    a.name.localeCompare(b.name) ||
                    a.title.localeCompare(b.title)
            );
            if (reverse) {
                supps = supps.reverse();
            }
            break;
        case "rarity":
            supps = supps.sort(
                (a, b) =>
                    sortBy(a.rarity, b.rarity, reverse) ||
                    a.name.localeCompare(b.name) ||
                    a.title.localeCompare(b.title)
            );
            break;
        case "release":
            supps = supps.sort(
                (a, b) =>
                    sortBy(
                        createDateObject({
                            date: a.release.global,
                        }).obj.getTime(),
                        createDateObject({
                            date: b.release.global,
                        }).obj.getTime(),
                        reverse
                    ) || sortBy(b.name, a.name, !reverse)
            );
            break;
    }

    return supps;
}
