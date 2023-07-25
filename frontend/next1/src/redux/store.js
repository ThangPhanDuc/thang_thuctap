import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import searchReducer from "./features/searchSlice";
import userReducer from "./features/userSlice";

export const store = configureStore({
  reducer: {
    counterReducer,
    searchReducer,
    userReducer
  },
});


