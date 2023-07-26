import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./features/searchSlice";
import userReducer from "./features/userSlice";

export const store = configureStore({
  reducer: {
    searchReducer,
    userReducer
  },
});


