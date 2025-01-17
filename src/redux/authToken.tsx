import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state for the auth token
interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: null, // Initially, no token is stored
};

// Create a slice for auth token management
const authTokenSlice = createSlice({
  name: "authToken",
  initialState,
  reducers: {
    storeAuthToken: (state, action: PayloadAction<string>) => {
      const token = action.payload;
      sessionStorage.setItem("authToken", token); // Save token in session storage
      state.token = token; // Update the Redux state
    },
    clearAuthToken: (state) => {
      sessionStorage.removeItem("authToken"); // Remove token from session storage
      state.token = null; // Clear the Redux state
    },
  },
});

// Export actions
export const { storeAuthToken, clearAuthToken } = authTokenSlice.actions;

// Export the reducer
export default authTokenSlice.reducer;

// Selector to get the auth token from state
export const selectAuthToken = (state: { authToken: AuthState }) =>
  state.authToken.token;

// Utility function to retrieve the token from session storage
export const getAuthToken = (): string | null => {
  return sessionStorage.getItem("authToken");
};
