import { createSelector } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { listenerMiddleware } from "rtk/middleware";
import type { RootState, AppDispatch } from "rtk/store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

type ExtraArgument = { [key: string]: string };

export const startAppListening = listenerMiddleware.startListening.withTypes<
    RootState,
    AppDispatch,
    ExtraArgument
>();

export const selectAppCharacters = createSelector(
    (state: RootState) => state,
    (state) => {
        let characters = [...state.characters.characters];
        if (!state.settings.unreleasedContent) {
            characters = characters.filter(
                (char) => char.release.global !== ""
            );
        }
        return characters;
    }
);

export const selectAppSupports = createSelector(
    (state: RootState) => state,
    (state) => {
        let supports = state.support.support;
        if (!state.settings.unreleasedContent) {
            supports = supports.filter((supp) => supp.release.global !== "");
        }
        return supports;
    }
);

export const selectAppSkills = createSelector(
    (state: RootState) => state,
    (state) => {
        let skills = state.skills.skills;
        if (!state.settings.unreleasedContent) {
            skills = skills.filter((skill) => skill.name.global !== undefined);
        }
        return skills;
    }
);
