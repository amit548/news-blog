import { createSlice } from '@reduxjs/toolkit';

export const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    isLoading: false,
    posts: [],
    postsAscategory: {},
    error: null,
  },
  reducers: {
    loadingData: (state) => {
      state.isLoading = true;
    },
    fetchPosts: (state, action) => {
      state.posts = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    savePostsAsCategory: (state) => {
      const সরকারি_চাকরি = state.posts.filter(
        (post) => post.category === 'সরকারি চাকরি'
      );
      if (সরকারি_চাকরি.length > 0)
        state.postsAscategory['সরকারি চাকরি'] = সরকারি_চাকরি;

      const বেসরকারি_চাকরি = state.posts.filter(
        (post) => post.category === 'বেসরকারি চাকরি'
      );
      if (বেসরকারি_চাকরি.length > 0)
        state.postsAscategory['বেসরকারি চাকরি'] = বেসরকারি_চাকরি;

      const পরীক্ষার_সিলেবাস = state.posts.filter(
        (post) => post.category === 'পরীক্ষার সিলেবাস'
      );
      if (পরীক্ষার_সিলেবাস.length > 0)
        state.postsAscategory['পরীক্ষার সিলেবাস'] = পরীক্ষার_সিলেবাস;

      const রেজাল্ট = state.posts.filter((post) => post.category === 'রেজাল্ট');
      if (রেজাল্ট.length > 0) state.postsAscategory['রেজাল্ট'] = রেজাল্ট;

      const নোটিশ = state.posts.filter((post) => post.category === 'নোটিশ');
      if (নোটিশ.length > 0) state.postsAscategory['নোটিশ'] = নোটিশ;
    },
    fetchFaild: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  fetchPosts,
  loadingData,
  fetchFaild,
  savePostsAsCategory,
} = postsSlice.actions;

export default postsSlice.reducer;
