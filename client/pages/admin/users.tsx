import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import UserList from '../../components/UserList';
import Redirect from '../../components/Redirect';
import { fetchUsers } from '../../features/user/userSlice';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  alert: {
    marginBottom: theme.spacing(1),
  },
  progress: {
    marginBottom: theme.spacing(2),
  },
}));

const Users = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const authData = useSelector((state: any) => state.auth);
  const userData = useSelector((state: any) => state.user);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>({});
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);

  const usersPerPage = 40;

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const result = await axios.get(
          `http://localhost:4000/api/user/list?page=${page}&limit=${usersPerPage}`,
          {
            withCredentials: true,
          }
        );
        dispatch(fetchUsers(result.data.users));
        setPageCount(Math.ceil((result.data.totalUsers || 0) / usersPerPage));
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

  return authData.user ? (
    authData.user.role === 'admin' ? (
      <>
        <Grid container>
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

          {userData.users.length > 0 ? (
            <>
              {userData.users.map((registeredUser: any) => (
                <UserList
                  key={registeredUser._id}
                  registeredUser={registeredUser}
                />
              ))}

              {pageCount > 1 && (
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
            </>
          ) : (
            <Grid item xs={12}>
              <Typography variant="h5">No Users Found</Typography>
            </Grid>
          )}
        </Grid>
      </>
    ) : (
      !authData.isLoading && <Redirect to="/admin" />
    )
  ) : (
    !authData.isLoading && <Redirect to="/" />
  );
};

export default Users;
