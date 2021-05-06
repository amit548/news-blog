import { Fragment, useContext } from 'react';
import Head from 'next/head';
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
    <Fragment>
      <Head>
        <title>
          কর্মের খোঁজ | আমাদের সতর্কতা আর আপনাদের চেষ্টা, সঙ্গে থাকুন
        </title>
        <meta
          name="description"
          content="যদি আপনি একজন চাকরি ও কাজের সমন্ধী হয়ে থাকেন তাহলে একদম সঠিক Website-এ এসেছেন,  আমাদের লক্ষ্য আপনাকে সঠিক তথ্য দেওয়া, প্রতারণার হাত থেকে সাবধান করা আর আপনাদের লক্ষ্য পূরণ করা | আমাদের সতর্কতা আর আপনাদের চেষ্টা, সঙ্গে থাকুন"
        />
        <meta name="robots" content="index, follow" />
      </Head>

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
    </Fragment>
  );
};

export default Home;
