import { configureStore } from "@reduxjs/toolkit";
import { listenerMiddleware } from "./middleware";

import layoutReducer from "reducers/layout";
import settingsReducer from "reducers/settings";
import browserReducer from "reducers/browser";
import characterReducer from "reducers/character";
import characterFilterReducer from "reducers/characterFilters";
import supportReducer from "reducers/support";
import supportFilterReducer from "reducers/supportFilters";
import skillReducer from "reducers/skill";

const store = configureStore({
    reducer: {
        layout: layoutReducer,
        settings: settingsReducer,
        browser: browserReducer,
        characters: characterReducer,
        characterFilters: characterFilterReducer,
        support: supportReducer,
        supportFilters: supportFilterReducer,
        skills: skillReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
