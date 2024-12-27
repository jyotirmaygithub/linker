// src/redux/gptSelectionSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
  title: string;
  description: string;
  keywords: string[];
}

interface GptSelection {
  usersearchType: string;
  gptData: Message | null;
}

// Define the initial state with a specific type
const initialState: GptSelection = {
  usersearchType: '',
  gptData: null,
};

const gptSelectionSlice = createSlice({
  name: 'gptSelection',
  initialState,
  reducers: {
    // Explicitly define the type of state parameter to handle `null` initial state
    setGptSelection: (state, action: PayloadAction<GptSelection>) => {
      return action.payload;
    },
    resetGptSelection: () => initialState,
  },
});

// Export actions
export const { setGptSelection, resetGptSelection } = gptSelectionSlice.actions;

// Export reducer
export default gptSelectionSlice.reducer;
