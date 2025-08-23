import { Skill } from "types/skill";
import { SkillFilterState } from "reducers/skillFilters";
import { BrowserSettings } from "reducers/browser";
import { sortBy } from "./utils";

export function filterSkills(
    skillList: Skill[],
    filters: SkillFilterState,
    searchValue: string,
    sortSettings: BrowserSettings
) {
    let skills = [...skillList].filter(
        (skill) => skill.name.global && skill.description.global
    );
    if (filters.rarity.length > 0) {
        skills = skills.filter((skill) =>
            filters.rarity.includes(skill.rarity)
        );
    }
    if (filters.conditions.length > 0) {
        skills = skills.filter((skill) =>
            filters.conditions.every((f) => skill.tags.includes(f))
        );
    }
    if (searchValue !== "") {
        skills = skills.filter((skill) =>
            skill.name.global.toLowerCase().includes(searchValue.toLowerCase())
        );
    }

    const reverse = sortSettings.sortDirection === "desc";

    switch (sortSettings.sortBy) {
        case "name":
            skills = skills.sort((a, b) =>
                a.name.global.localeCompare(b.name.global)
            );
            if (reverse) {
                skills = skills.reverse();
            }
            break;
        case "rarity":
            skills = skills.sort(
                (a, b) =>
                    sortBy(a.rarity, b.rarity, reverse) || sortBy(b.id, a.id)
            );
            break;
        case "type":
            skills = skills.sort(
                (a, b) => sortBy(b.icon, a.icon, reverse) || sortBy(b.id, a.id)
            );
            break;
    }

    return skills;
}
