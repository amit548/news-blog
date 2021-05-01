import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';

import AdminPostCard from '../../components/AdminPostCard';
import Redirect from '../../components/Redirect';
import { AuthContext } from '../../context/AuthContext';

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

  const { user, isLoading } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>({});
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);

  const postsPerPage = 30;

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `/api/post/admin?page=${page}&limit=${postsPerPage}`,
          {
            withCredentials: true,
          }
        );
        setPosts(response.data.posts);
        setPageCount(Math.ceil(response.data.totalPosts / postsPerPage));
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
  }, [page]);

  return user ? (
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

      {page > 1 && (
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center">
            <Pagination
              variant="outlined"
              color="primary"
              count={pageCount}
              page={page}
              onChange={(_, value) => setPage(value)}
            />
          </Box>
        </Grid>
      )}
    </Grid>
  ) : (
    !isLoading && <Redirect to="/" />
  );
};

export default Posts;
