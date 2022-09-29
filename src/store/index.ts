import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import logger from "redux-logger";

import rootReducer from "../reducers";

let middlewares = [];
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middlewares)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
