import axios from 'axios';
import { useEffect, useState } from 'react';
import { Pagination, Alert } from '@material-ui/lab';
import {
  Box,
  Grid,
  CircularProgress,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import UserList from '../../components/UserList';
import Redirect from '../../components/Redirect';
import { fetchUsers } from '../../features/user/userSlice';

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

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const result = await axios.get('http://localhost:4000/api/user/list', {
          withCredentials: true,
        });
        dispatch(fetchUsers(result.data));
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

          {userData.users.map((registeredUser) => (
            <UserList
              key={registeredUser._id}
              registeredUser={registeredUser}
            />
          ))}
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Pagination variant="outlined" color="primary" count={20} />
            </Box>
          </Grid>
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
