import axios from 'axios';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Pagination from '@material-ui/lab/Pagination';
import { useEffect, useState } from 'react';
import { Box, CircularProgress, Grid, Theme } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import AdminPostCard from '../../components/AdminPostCard';

const useStyles = makeStyles((theme: Theme) => ({
  alert: {
    marginBottom: theme.spacing(1),
  },
  progress: {
    marginBottom: theme.spacing(2),
    width: '100%',
  },
}));

const Posts = () => {
  const classes = useStyles();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>({});

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'http://localhost:4000/api/post/admin',
          {
            withCredentials: true,
          }
        );
        setPosts(response.data);
        setError({});
        setLoading(false);
      } catch (error) {
        if (error.response)
          setError({
            ...error.response.data.body,
          });
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Grid container spacing={1}>
      {loading && (
        <Box
          display="flex"
          justifyContent="center"
          className={classes.progress}
        >
          <CircularProgress />
        </Box>
      )}

      {Object.keys(error).map((err) => (
        <Grid item xs={12}>
          <Alert severity="error" key={err} className={classes.alert}>
            {error[err]}
          </Alert>
        </Grid>
      ))}

      {posts.map((post) => (
        <AdminPostCard
          key={post._id}
          post={post}
          setPosts={setPosts}
          setError={setError}
          setLoading={setLoading}
        />
      ))}

      <Grid item xs={12}>
        <Box display="flex" justifyContent="center">
          <Pagination variant="outlined" color="primary" count={20} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Posts;
