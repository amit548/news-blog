import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import UserList from '../../components/UserList';
import Redirect from '../../components/Redirect';
import { AuthContext } from '../../context/AuthContext';
import { UserContext } from '../../context/UserContext';

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

  const { user, isLoading: asAuthUserLoading } = useContext(AuthContext);
  const {
    setUsers,
    users,
    isLoading: asUserLoading,
    setIsLoading: asSetUserIsLoading,
    error,
    setError,
  } = useContext(UserContext);

  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);

  const usersPerPage = 40;

  useEffect(() => {
    (async () => {
      asSetUserIsLoading(true);
      try {
        const result = await axios.get(
          `/api/user/list?page=${page}&limit=${usersPerPage}`,
          {
            withCredentials: true,
          }
        );
        setUsers(result.data.users);
        setPageCount(Math.ceil((result.data.totalUsers || 0) / usersPerPage));
        setError({});
        asSetUserIsLoading(false);
      } catch (error) {
        if (error.response)
          setError({
            ...error.response.data.body,
          });
        asSetUserIsLoading(false);
      }
    })();
  }, [page]);

  return user ? (
    user.role === 'admin' ? (
      <>
        <Grid container>
          {asUserLoading && (
            <Box
              display="flex"
              justifyContent="center"
              className={classes.progress}
            >
              <CircularProgress />
            </Box>
          )}

          {error &&
            Object.keys(error).length > 0 &&
            Object.keys(error).map((err) => (
              <Grid item xs={12}>
                <Alert severity="error" key={err} className={classes.alert}>
                  {error[err]}
                </Alert>
              </Grid>
            ))}

          {users.length > 0 ? (
            <>
              {users.map((registeredUser: any) => (
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
      !asAuthUserLoading && <Redirect to="/admin" />
    )
  ) : (
    !asAuthUserLoading && <Redirect to="/" />
  );
};

export default Users;
