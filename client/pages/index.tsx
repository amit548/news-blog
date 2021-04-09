import { Box, CircularProgress, Grid, Typography } from '@material-ui/core';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import News from '../components/News';
import SideBar from '../components/SideBar';
import {
  fetchFaild,
  fetchPosts,
  loadingData,
  savePostsAsCategory,
} from '../features/posts/postsSlice';

const Home = () => {
  const dispatch = useDispatch();

  const postsData = useSelector((state: any) => state.posts);

  useEffect(() => {
    (async () => {
      dispatch(loadingData());
      try {
        const result = await axios.get('http://localhost:4000/api/post');
        dispatch(fetchPosts(result.data));
        dispatch(savePostsAsCategory());
      } catch (error) {
        dispatch(fetchFaild(error.response.data.body));
      }
    })();
  }, []);

  return (
    <Grid container spacing={1}>
      {postsData.isLoading && (
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        </Grid>
      )}
      <Grid item xs={12} md={9}>
        <Grid container spacing={1}>
          {Object.keys(postsData.postsAscategory).map((categoryPostKey, i) => (
            <News
              key={i}
              chipName={categoryPostKey}
              posts={postsData.postsAscategory[categoryPostKey]}
            />
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12} md={3}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h5">Useful videos</Typography>
          </Grid>
          <SideBar />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
