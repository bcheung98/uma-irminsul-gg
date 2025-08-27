import { createSlice } from "@reduxjs/toolkit";
import { fetchEvents, LoadingStatus } from "rtk/fetchData";
import { EventList } from "types/event";

export interface EventState {
    status: LoadingStatus;
    events: EventList;
}

const initialState: EventState = {
    status: "idle",
    events: {},
};

export const eventSlice = createSlice({
    name: "events",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchEvents.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(fetchEvents.fulfilled, (state, action) => {
            const { type } = action.meta.arg;
            if (!state.events[type]) {
                state.events[type] = [];
            }
            state.events[type] = action.payload;
            state.status = "success";
        });
        builder.addCase(fetchEvents.rejected, (state) => {
            state.status = "error";
        });
    },
    selectors: {
        selectEvents: (state): EventList => state.events,
    },
});

export const { selectEvents } = eventSlice.selectors;

export default eventSlice.reducer;
