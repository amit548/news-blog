import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

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

  const [videoList, setVideoList] = useState([]);

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

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get('http://localhost:4000/api/post/video');
        setVideoList(result.data);
      } catch (error) {}
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
          {videoList.length > 0 ? (
            videoList.map((video) => <SideBar video={video} key={video._id} />)
          ) : (
            <Grid item xs={12}>
              <Typography>No videos found</Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
