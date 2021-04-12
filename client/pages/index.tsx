import { useContext } from 'react';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import News from '../components/News';
import SideBar from '../components/SideBar';

import { PostContext } from '../context/PostContext';

const Home = () => {
  const { isPostLoading, postsAscategory, videos } = useContext(PostContext);

  return (
    <Grid container spacing={1}>
      {isPostLoading ? (
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        </Grid>
      ) : (
        <Grid item xs={12} md={9}>
          <Grid container spacing={1}>
            {Object.keys(postsAscategory).length > 0 ? (
              Object.keys(postsAscategory).map((categoryPostKey, i) => (
                <News
                  key={i}
                  chipName={categoryPostKey}
                  posts={postsAscategory[categoryPostKey]}
                />
              ))
            ) : (
              <Typography variant="h5">No Post Found</Typography>
            )}
          </Grid>
        </Grid>
      )}

      <Grid item xs={12} md={3}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h5">Useful videos</Typography>
          </Grid>
          {videos.length > 0 ? (
            videos.map((video) => <SideBar video={video} key={video._id} />)
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
