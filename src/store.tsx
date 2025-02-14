// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import gptSelectionReducer from './redux/gptSelectionSlice';
import AuthToken  from "./redux/authToken"
import UserData from "./redux/userData";

const store = configureStore({
  reducer: {
    user: gptSelectionReducer,
    authToken: AuthToken,
    userData: UserData
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
