import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    isLoading: true,
    error: null,
  },
  reducers: {
    fetchUsers: (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user._id !== action.payload);
      state.error = null;
      state.isLoading = false;
    },
    deleteUserError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { fetchUsers, deleteUser } = userSlice.actions;

export default userSlice.reducer;
