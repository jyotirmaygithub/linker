import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the user data state
interface UserState {
  username: string | null;
  email: string | null;
}

// Initial state with null values
const initialState: UserState = {
  username: null,
  email: null,
};

// Create the user data slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeUserData: (state, action: PayloadAction<UserState>) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
    clearUserData: (state) => {
      state.username = null;
      state.email = null;
    },
  },
});

// Export actions
export const { storeUserData, clearUserData } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
