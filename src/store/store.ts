import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { usersGetAllSlice } from "./usersSlice";

export const store = configureStore({
  reducer: {
    users: combineReducers({
      getAll: usersGetAllSlice.reducer,
    }),
  },
});

export type RootState = ReturnType<typeof store.getState>;
