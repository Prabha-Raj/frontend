import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        user: null,
        error: null,
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.loading = false; // Reset loading when user is set
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false; // Reset loading when there's an error
        },
        logout: (state) => {
            state.user = null;
            state.error = null;
            state.loading = false; // Reset loading on logout
        },
    },
});

// Export actions for use in components
export const { setLoading, setUser, setError, logout } = authSlice.actions;

// Export the reducer to be used in the store
export default authSlice.reducer; // Ensure you export the reducer
