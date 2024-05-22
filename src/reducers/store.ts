import { Action, configureStore } from "@reduxjs/toolkit";
import { logger } from "redux-logger";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import { HOME_MODULE } from "../constants/modules";
import { api } from "../apis/api";
import homeReducer, { HomeState } from "./homeReducer";

export type AppState = {
  [HOME_MODULE]: HomeState;
};

export const rtkQueryErrorLogger =
  (api: any) => (next: (action: any) => void) => (action: any) => {
    if (isRejectedWithValue(action)) {
      const errorMessage = action?.payload?.data?.detail;
      console.error(errorMessage, api.dispatch);
    }
    return next(action);
  };

export const store = configureStore<AppState, Action>({
  reducer: {
    [HOME_MODULE]: homeReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .concat(rtkQueryErrorLogger)
      .concat(logger),
});
