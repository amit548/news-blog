import { Fragment } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Carousel } from 'react-responsive-carousel';
import { makeStyles, Theme } from '@material-ui/core';
import axios from 'axios';

import News from '../components/News';
import SideBar from '../components/SideBar';
import { GetServerSideProps } from 'next';

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

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: trendingPost } = await axios.get(
    encodeURI('/api/post/trending_news')
  );
  const result1 = await axios.get(
    encodeURI('/api/post/news?category=সরকারি চাকরি')
  );
  const result2 = await axios.get(
    encodeURI('/api/post/news?category=বেসরকারি চাকরি')
  );
  const result3 = await axios.get(
    encodeURI('/api/post/news?category=পার্ট টাইম জব')
  );
  const result4 = await axios.get(
    encodeURI('/api/post/news?category=পরীক্ষার প্রস্তুতি')
  );
  const result5 = await axios.get(encodeURI('/api/post/news?category=নোটিশ'));

  let posts = [];
  let postsAscategory = {};

  posts = [
    ...result1.data.posts,
    ...result2.data.posts,
    ...result3.data.posts,
    ...result4.data.posts,
    ...result5.data.posts,
  ];

  const সরকারি_চাকরি = posts.filter((post) => post.category === 'সরকারি চাকরি');
  if (সরকারি_চাকরি.length > 0)
    postsAscategory = {
      ...postsAscategory,
      'সরকারি চাকরি': সরকারি_চাকরি,
    };

  const বেসরকারি_চাকরি = posts.filter(
    (post) => post.category === 'বেসরকারি চাকরি'
  );
  if (বেসরকারি_চাকরি.length > 0)
    postsAscategory = {
      ...postsAscategory,
      'বেসরকারি চাকরি': বেসরকারি_চাকরি,
    };

  const পার্ট_টাইম_জব = posts.filter(
    (post) => post.category === 'পার্ট টাইম জব'
  );
  if (পার্ট_টাইম_জব.length > 0)
    postsAscategory = {
      ...postsAscategory,
      'পার্ট টাইম জব': পার্ট_টাইম_জব,
    };

  const পরীক্ষার_প্রস্তুতি = posts.filter(
    (post) => post.category === 'পরীক্ষার প্রস্তুতি'
  );
  if (পরীক্ষার_প্রস্তুতি.length > 0)
    postsAscategory = {
      ...postsAscategory,
      'পরীক্ষার প্রস্তুতি': পরীক্ষার_প্রস্তুতি,
    };

  const নোটিশ = posts.filter((post) => post.category === 'নোটিশ');
  if (নোটিশ.length > 0)
    postsAscategory = {
      ...postsAscategory,
      নোটিশ: নোটিশ,
    };

  const { data: videos } = await axios.get(encodeURI('/api/post/video'));

  return {
    props: {
      trendingPost,
      posts,
      postsAscategory,
      videos,
    },
  };
};

const Home = ({ trendingPost, posts, postsAscategory, videos }) => {
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
        {trendingPost.length > 0 && (
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
                      src={`http://localhost:4000/public/images/${post.thumbnailImage}`}
                    />
                    <p className="legend">{post.title}</p>
                  </div>
                ))}
            </Carousel>
          </Grid>
        )}

        {posts.length < 0 ? (
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
