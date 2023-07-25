import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    value: "search state 123",
};

export const search = createSlice({
    name: "search",
    initialState,
    reducers: {
        reset: () => initialState,
        changeSearchKeyword: (state, action) => {
            state.value = action.payload;
        },

    },
});

export const {
    changeSearchKeyword,
    reset,
} = search.actions;
export default search.reducer;
