import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core/styles';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';

import Redirect from '../../components/Redirect';
import { login } from '../../features/auth/authSlice';

const useStyles = makeStyles((theme: Theme) => ({
  divider: {
    marginBottom: theme.spacing(2),
  },
  alert: {
    marginBottom: theme.spacing(1),
  },
  progress: {
    marginBottom: theme.spacing(2),
  },
}));

const Login = () => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();

  const authData = useSelector((state: any) => state.auth);

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>({});

  const onSumbitLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(
        'http://localhost:4000/api/user/login',
        loginData,
        { withCredentials: true }
      );
      setLoading(false);
      setError({});
      dispatch(login(result.data));
      router.push('/admin');
    } catch (error) {
      setLoading(false);
      if (error.response)
        setError({
          ...error.response.data.body,
        });
    }
  };

  return authData.user ? (
    !authData.isLoading && <Redirect to="/admin" />
  ) : (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Card variant="outlined">
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            align="center"
            color="textSecondary"
          >
            Please Login
          </Typography>
          <Divider className={classes.divider} />

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
            <Alert severity="error" key={err} className={classes.alert}>
              {error[err]}
            </Alert>
          ))}

          <form noValidate autoComplete="off" onSubmit={onSumbitLogin}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  required
                  error={!!error.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  required
                  error={!!error.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  type="submit"
                  disabled={loading}
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
