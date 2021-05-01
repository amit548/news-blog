import { useRouter } from 'next/router';
import { FormEvent, useContext, useState } from 'react';
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
import { AuthContext } from '../../context/AuthContext';

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

  const {
    setIsLoading,
    setError,
    setUser,
    user,
    isLoading,
    error,
  } = useContext(AuthContext);

  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const onSumbitLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await axios.post(
        '/api/user/login',
        loginData,
        { withCredentials: true }
      );
      setError({});
      setUser(result.data);
      router.push('/admin');
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error.response)
        setError({
          ...error.response.data.body,
        });
    }
  };

  return user ? (
    !isLoading && <Redirect to="/admin" />
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

          {isLoading && (
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

          {Object.keys(error).length > 0 && <br />}

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
                  disabled={isLoading}
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
