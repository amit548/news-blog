import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';
import postsReducer from '../features/posts/postsSlice';
import userReducer from '../features/user/userSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    user: userReducer,
  },
});
