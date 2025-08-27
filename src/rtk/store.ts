import { configureStore } from "@reduxjs/toolkit";
import { listenerMiddleware } from "./middleware";

import layoutReducer from "reducers/layout";
import settingsReducer from "reducers/settings";
import browserReducer from "reducers/browser";
import profileReducer from "reducers/characterProfiles";
import characterReducer from "reducers/character";
import characterFilterReducer from "reducers/characterFilters";
import supportReducer from "reducers/support";
import supportFilterReducer from "reducers/supportFilters";
import skillReducer from "reducers/skill";
import skillFilterReducer from "reducers/skillFilters";
import eventReducer from "reducers/event";
import bannerReducer from "reducers/banner";

const store = configureStore({
    reducer: {
        layout: layoutReducer,
        settings: settingsReducer,
        browser: browserReducer,
        characterProfiles: profileReducer,
        characters: characterReducer,
        characterFilters: characterFilterReducer,
        support: supportReducer,
        supportFilters: supportFilterReducer,
        skills: skillReducer,
        skillFilters: skillFilterReducer,
        events: eventReducer,
        banners: bannerReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
