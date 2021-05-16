import { Fragment, useContext } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Carousel } from 'react-responsive-carousel';
import { makeStyles, Theme } from '@material-ui/core';

import News from '../components/News';
import SideBar from '../components/SideBar';
import { PostContext } from '../context/PostContext';
import axios from 'axios';

const useStyles = makeStyles((theme: Theme) => ({
  imageContainer: {
    [theme.breakpoints.down('xs')]: {
      height: 250,
      width: '100%',
    },
    [theme.breakpoints.up('xs')]: {
      height: 300,
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      height: 350,
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      height: 400,
      width: '100%',
    },
    [theme.breakpoints.up('lg')]: {
      height: 450,
      width: '100%',
    },
    cursor: 'pointer',
  },
  imageBlock: {
    overflow: 'hidden',
    minWidth: '100%',
    minHeight: '100%',
    objectFit: 'cover',
    objectPosition: 'center bottom',
  },
}));

// export const getStaticProps = async () => {
//   const { data: trendingPost } = await axios.get('/api/post/trending_news');
//   const result1 = await axios.get('/api/post/news?category=সরকারি চাকরি');
//   const result2 = await axios.get('/api/post/news?category=বেসরকারি চাকরি');
//   const result3 = await axios.get('/api/post/news?category=পার্ট টাইম জব');
//   const result4 = await axios.get('/api/post/news?category=পরীক্ষার প্রস্তুতি');
//   const result5 = await axios.get('/api/post/news?category=নোটিশ');

//   let posts = [];
//   let postsAscategory = {};

//   posts = [
//     ...result1.data.posts,
//     ...result2.data.posts,
//     ...result3.data.posts,
//     ...result4.data.posts,
//     ...result5.data.posts,
//   ];

//   const সরকারি_চাকরি = posts.filter(
//     (post) => post.category === 'সরকারি চাকরি'
//   );
//   if (সরকারি_চাকরি.length > 0)
//   postsAscategory((prevPostsAsCategory: any) => ({
//       ...prevPostsAsCategory,
//       'সরকারি চাকরি': সরকারি_চাকরি,
//     }));

//   return {
//     props: {
//       trendingPost,
//       posts,
//     },
//   };
// };

const Home = () => {
  const {
    isPostLoading,
    postsAscategory,
    videos,
    isTrendingPostLoading,
    trendingPost,
  } = useContext(PostContext);
  const classes = useStyles();
  const router = useRouter();

  const title = 'কর্মের খোঁজ | আমাদের সতর্কতা আর আপনাদের চেষ্টা, সঙ্গে থাকুন';
  const description =
    'যদি আপনি একজন চাকরি ও কাজের সমন্ধী হয়ে থাকেন তাহলে একদম সঠিক Website-এ এসেছেন,  আমাদের লক্ষ্য আপনাকে সঠিক তথ্য দেওয়া, প্রতারণার হাত থেকে সাবধান করা আর আপনাদের লক্ষ্য পূরণ করা | আমাদের সতর্কতা আর আপনাদের চেষ্টা, সঙ্গে থাকুন';

  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta
          name="keywords"
          content="সরকারি চাকরি, বেসরকারি চাকরি, পার্ট টাইম জব, পরীক্ষার প্রস্তুতি, নোটিশ"
        />
        <meta name="robots" content="index, follow" />
      </Head>

      <Grid container spacing={1}>
        {!isTrendingPostLoading && (
          <Grid item xs={12}>
            <Carousel
              infiniteLoop={true}
              interval={5000}
              autoPlay={true}
              showThumbs={false}
            >
              {trendingPost &&
                trendingPost.map((post) => (
                  <div
                    className={classes.imageContainer}
                    key={post._id}
                    onClick={() => {
                      router.push(`/post/${post._id}`);
                    }}
                  >
                    <img
                      className={classes.imageBlock}
                      src={`/public/images/${post.thumbnailImage}`}
                    />
                    <p className="legend">{post.title}</p>
                  </div>
                ))}
            </Carousel>
          </Grid>
        )}

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
