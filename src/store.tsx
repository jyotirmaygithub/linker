// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import gptSelectionSlice from './redux/gptSelectionSlice';

const store = configureStore({
  reducer: {
    user: gptSelectionSlice,
  },
});

export default store;
