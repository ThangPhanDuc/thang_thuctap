import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  value: {
    "min_age":18,
    "max_age":55,
    "min_height":150,
    "max_height":185,
    "distance":80,
    "gender":"",
    "educationLevel":"No preference"
  },
} ;

export const idealMatch = createSlice({
  name: "idealMatch",
  initialState,
  reducers: {
    setIdealMatch: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {
    setIdealMatch,
} = idealMatch.actions;
export default idealMatch.reducer;
