import { Fragment } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Head from 'next/head';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Carousel } from 'react-responsive-carousel';
import ReactPlayer from 'react-player';
import Moment from 'react-moment';
import parser from 'html-react-parser';
import { GetServerSideProps } from 'next';

import SideBar from '../../components/SideBar';
import { Box, Button } from '@material-ui/core';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme: Theme) => ({
  alert: {
    marginBottom: theme.spacing(1),
  },
  imageContainer: {
    [theme.breakpoints.down('xs')]: {
      height: 192,
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
      height: 405,
      width: '100%',
    },
    [theme.breakpoints.up('lg')]: {
      height: 519,
      width: '100%',
    },
  },
  imageBlock: {
    overflow: 'hidden',
    objectFit: 'cover',
    minWidth: '100%',
    minHeight: '100%',
  },
}));

export const getServerSideProps: GetServerSideProps = async ({
  params: { id },
}) => {
  try {
    const { data: post } = await axios.get(`/api/post/${id}`);
    const { data: videos } = await axios.get('/api/post/video');

    const images = [];
    if (post) {
      if (post.thumbnailImage) images.push(post.thumbnailImage);
      if (post.image1) images.push(post.image1);
      if (post.image2) images.push(post.image2);
      if (post.image3) images.push(post.image3);
      if (post.image4) images.push(post.image4);
    }

    return {
      props: {
        post,
        images,
        videos,
      },
    };
  } catch (err) {
    return {
      props: {
        error: 'Sorry, Request post not found',
      },
    };
  }
};

const Post = ({ post, images, videos, error }) => {
  const classes = useStyles();
  const router = useRouter();

  if (error)
    return (
      <Box
        display="flex"
        flexDirection="column"
        style={{ height: '100%' }}
        justifyContent="center"
        alignItems="center"
      >
        <h1>{error}</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.back()}
        >
          Go Back
        </Button>
      </Box>
    );

  const description = post.description
    .replace(/<[^>]*>?/gm, '')
    .trim()
    .replace(/&amp;nbsp/gi, '')
    .trim()
    .replace(/&nbsp;/gi, '')
    .trim()
    .substring(0, 159)
    .concat('...');

  return (
    post && (
      <Fragment>
        <Head>
          <title>{post.title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={post.title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={post.title} />
          <meta property="twitter:description" content={description} />
          <meta
            property="og:image"
            content={`/public/images/${post.thumbnailImage}`}
          />
          <meta
            property="twitter:image"
            content={`/public/images/${post.thumbnailImage}`}
          />
          <meta name="keywords" content={description.split(' ').join(', ')} />
          <meta name="robots" content="index, follow" />
        </Head>

        <Grid container spacing={1}>
          <Grid item xs={12} md={9}>
            <Typography variant="h4">{post.title}</Typography>
            <Typography variant="caption" color="textSecondary" gutterBottom>
              <Moment fromNow>{post.createdAt}</Moment>
            </Typography>
            <Carousel showThumbs={false}>
              {images.map((image) => (
                <div key={image} className={classes.imageContainer}>
                  <img
                    className={classes.imageBlock}
                    src={`http://localhost:4000/public/images/${image}`}
                  />
                </div>
              ))}
            </Carousel>
            <Typography component="div">{parser(post.description)}</Typography>
            {post.videoUrl && (
              <ReactPlayer url={post.videoUrl} width="100%" controls={true} />
            )}
          </Grid>
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
    )
  );
};

export default Post;
