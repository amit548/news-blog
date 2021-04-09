import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    loadingData: (state) => {
      state.error = null;
      state.isLoading = true;
    },
    login: (state, action) => {
      state.user = action.payload;
      state.error = null;
      state.isLoading = false;
    },
    logout: (state) => {
      state.user = null;
    },
    loginError: (state, action) => {
      state.error = action.payload;
      state.user = null
      
    },
  },
});

export const { login, logout, loginError, loadingData } = authSlice.actions;

export default authSlice.reducer;
