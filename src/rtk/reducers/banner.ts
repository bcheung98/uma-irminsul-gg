import { createSlice } from "@reduxjs/toolkit";
import { startAppListening } from "helpers/hooks";
import {
    fetchCharacterBanners,
    fetchSupportBanners,
    LoadingStatus,
} from "rtk/fetchData";
import { Banner } from "types/banner";

export interface BannerState {
    status: LoadingStatus;
    characterBanners: Banner[];
    supportBanners: Banner[];
}

const storedCharacterBanners =
    localStorage.getItem("banners/character") || "null";
const storedSupportBanners = localStorage.getItem("banners/support") || "null";

const initialState: BannerState = {
    status: "idle",
    characterBanners:
        storedCharacterBanners !== "null"
            ? JSON.parse(storedCharacterBanners)
            : [],
    supportBanners:
        storedSupportBanners !== "null" ? JSON.parse(storedSupportBanners) : [],
};

export const bannerSlice = createSlice({
    name: "banners",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCharacterBanners.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(fetchCharacterBanners.fulfilled, (state, action) => {
            if (JSON.stringify(action.payload) !== storedCharacterBanners) {
                state.characterBanners = action.payload;
            }
            state.status = "success";
        });
        builder.addCase(fetchCharacterBanners.rejected, (state) => {
            state.status = "error";
        });
        builder.addCase(fetchSupportBanners.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(fetchSupportBanners.fulfilled, (state, action) => {
            if (JSON.stringify(action.payload) !== storedSupportBanners) {
                state.supportBanners = action.payload;
            }
            state.status = "success";
        });
        builder.addCase(fetchSupportBanners.rejected, (state) => {
            state.status = "error";
        });
    },
    selectors: {
        getBannerStatus: (state): LoadingStatus => state.status,
        selectCharacterBanners: (state): Banner[] => state.characterBanners,
        selectSupportBanners: (state): Banner[] => state.supportBanners,
    },
});

export const { getBannerStatus, selectCharacterBanners, selectSupportBanners } =
    bannerSlice.selectors;

export default bannerSlice.reducer;

startAppListening({
    actionCreator: fetchCharacterBanners.fulfilled,
    effect: (action) => {
        const data = JSON.stringify(action.payload);
        if (data !== storedCharacterBanners) {
            localStorage.setItem("banners/character", data);
        }
    },
});

startAppListening({
    actionCreator: fetchSupportBanners.fulfilled,
    effect: (action) => {
        const data = JSON.stringify(action.payload);
        if (data !== storedSupportBanners) {
            localStorage.setItem("banners/support", data);
        }
    },
});
