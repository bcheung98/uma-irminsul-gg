import { createSlice } from "@reduxjs/toolkit";
import { startAppListening } from "helpers/hooks";
import { fetchSupports, LoadingStatus } from "rtk/fetchData";
import { Support } from "types/support";

export interface SupportState {
    status: LoadingStatus;
    support: Support[];
}

const storedSupports = localStorage.getItem("data/support") || "null";

const storedSettings = localStorage.getItem("settings") || "{}";
const { unreleasedContent = false } = JSON.parse(storedSettings);

const initialState: SupportState = {
    status: "idle",
    support: storedSupports !== "null" ? JSON.parse(storedSupports) : [],
};

export const supportSlice = createSlice({
    name: "support",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSupports.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(fetchSupports.fulfilled, (state, action) => {
            let payload = action.payload;
            if (!unreleasedContent) {
                payload = payload.filter((item) => item.release.global !== "");
            }
            if (JSON.stringify(payload) !== storedSupports) {
                state.support = payload;
            }
            state.status = "success";
        });
        builder.addCase(fetchSupports.rejected, (state) => {
            state.status = "error";
        });
    },
    selectors: {
        selectSupports: (state): Support[] => state.support,
    },
});

export const { selectSupports } = supportSlice.selectors;

export default supportSlice.reducer;

startAppListening({
    actionCreator: fetchSupports.fulfilled,
    effect: (action) => {
        let payload = action.payload;
        if (!unreleasedContent) {
            payload = payload.filter((item) => item.release.global !== "");
        }
        const data = JSON.stringify(payload);
        if (data !== storedSupports) {
            localStorage.setItem("data/support", data);
        }
    },
});
