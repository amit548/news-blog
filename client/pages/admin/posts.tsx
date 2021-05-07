import axios from 'axios';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Alert from '@material-ui/lab/Alert';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';

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
  table: {
    minWidth: 650,
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: 0,
    outline: 0,
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    '&:hover, &:focus': {
      outline: '0',
    },
  },
}));

const StyledTableCell = withStyles((theme: Theme) => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const Posts = () => {
  const classes = useStyles();
  const router = useRouter();

  const { user, isLoading } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>({});
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);

  const postsPerPage = 15;

  const handlePostDelete = async (id: string) => {
    const areYouOk = confirm('Do you really want to delete this post?');
    if (!areYouOk) return;
    setLoading(true);
    try {
      await axios.delete(`/api/post/${id}`, {
        withCredentials: true,
      });
      setPosts((prevPost: any) =>
        prevPost.filter((_post: any) => _post._id !== id)
      );
      setError({});
      setLoading(false);
    } catch (error) {
      if (error.response)
        setError({
          ...error.response.data.body,
        });
      setLoading(false);
    }
  };

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

      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell align="right">Title</StyledTableCell>
              <StyledTableCell align="right">Creator</StyledTableCell>
              <StyledTableCell align="right">Public</StyledTableCell>
              <StyledTableCell align="right">Trending</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
              <StyledTableRow key={post._id}>
                <StyledTableCell>
                  <div
                    style={{
                      width: 110,
                      height: 60,
                    }}
                  >
                    <img
                      style={{
                        overflow: 'hidden',
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                      }}
                      src={`/public/images/${post.thumbnailImage}`}
                      alt=""
                    />
                  </div>
                </StyledTableCell>
                <StyledTableCell align="right">
                  {post.title.substring(0, 15)}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {post.creator.firstName} {post.creator.lastName}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {post.private === true ? (
                    <HighlightOffRoundedIcon color="error" />
                  ) : (
                    <CheckCircleOutlineRoundedIcon
                      style={{ color: green[500] }}
                    />
                  )}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {post.trending === true ? (
                    <CheckCircleOutlineRoundedIcon
                      style={{ color: green[500] }}
                    />
                  ) : (
                    <HighlightOffRoundedIcon color="error" />
                  )}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton
                    style={{ color: blue[500] }}
                    onClick={() => {
                      router.push(`/admin/edit-post/${post._id}`);
                    }}
                  >
                    <EditIcon />
                  </IconButton>{' '}
                  <IconButton
                    color="primary"
                    onClick={handlePostDelete.bind(this, post._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {pageCount > 1 && (
        <Grid item xs={12}>
          <Box display="flex" mt={2} justifyContent="center">
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
