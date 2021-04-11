import axios from 'axios';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';

import AdminPostCard from '../../components/AdminPostCard';
import Redirect from '../../components/Redirect';

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

  const authData = useSelector((state: any) => state.auth);

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

  return authData.user ? (
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
  ) : (
    !authData.isLoading && <Redirect to="/" />
  );
};

export default Posts;
