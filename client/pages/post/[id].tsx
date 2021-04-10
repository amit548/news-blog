import {
  Grid,
  Typography,
  Box,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import SideBar from '../../components/SideBar';
import Moment from 'react-moment';
import parser from 'html-react-parser';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  alert: {
    marginBottom: theme.spacing(1),
  },
}));

const Post = () => {
  const router = useRouter();
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [error, setError] = useState<any>({});
  const [images, setImages] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const result = await axios.get(
          `http://localhost:4000/api/post/${router.query.id}`
        );
        setPost(result.data);
        setError({});
        setLoading(false);
      } catch (error) {
        if (error.response) setError({ ...error.response.data.body });
        setLoading(false);
      }
    })();
  }, [router.query.id]);

  useEffect(() => {
    setImages(() => {
      const dt = [];
      if (post) {
        if (post.thumbnailImage) dt.push(post.thumbnailImage);
        if (post.image1) dt.push(post.image1);
        if (post.image2) dt.push(post.image2);
        if (post.image3) dt.push(post.image3);
        if (post.image4) dt.push(post.image4);
      }
      return dt;
    });
  }, [post]);

  return (
    post && (
      <Grid container spacing={1}>
        {loading && (
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          </Grid>
        )}

        {Object.keys(error).map((err) => (
          <Alert severity="error" key={err} className={classes.alert}>
            {error[err]}
          </Alert>
        ))}

        <Grid item xs={12} md={9}>
          <Typography variant="h4">{post.title}</Typography>
          <Typography variant="caption" color="textSecondary" gutterBottom>
            <Moment fromNow>{post.createdAt}</Moment>
          </Typography>
          <Carousel showThumbs={false}>
            {images.map((image) => (
              <div key={image}>
                <img src={`http://localhost:4000/public/images/${image}`} />
              </div>
            ))}
          </Carousel>
          <Typography component="div">{parser(post.description)}</Typography>
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
    )
  );
};

export default Post;