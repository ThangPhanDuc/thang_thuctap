import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./features/searchSlice";
import userReducer from "./features/userSlice";
import idealMatchReducer from "./features/IdealMatchSlice";

export const store = configureStore({
  reducer: {
    searchReducer,
    userReducer,
    idealMatchReducer
  },
});


