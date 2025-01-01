// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import gptSelectionReducer from './redux/gptSelectionSlice';

const store = configureStore({
  reducer: {
    user: gptSelectionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
