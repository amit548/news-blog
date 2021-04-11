import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
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

const useStyles = makeStyles((theme: Theme) => ({
  divider: {
    marginBottom: theme.spacing(2),
  },
  progress: {
    marginBottom: theme.spacing(2),
  },
  alert: {
    marginBottom: theme.spacing(1),
  },
}));

const Register = () => {
  const classes = useStyles();
  const router = useRouter();

  const authData = useSelector((state: any) => state.auth);

  const [loading, setLoading] = useState(false);
  const [registerData, setRegisterData] = useState({});
  const [error, setError] = useState<any>({});

  const onSumbitRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      await axios.post(
        'http://localhost:4000/api/user/register',
        registerData,
        { withCredentials: true }
      );

      setLoading(false);
      setError({});
      router.push('/admin/users');
    } catch (error) {
      setLoading(false);
      if (error.response)
        setError({
          ...error.response.data.body,
        });
    }
  };

  return authData.user ? (
    authData.user.role === 'admin' ? (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Card variant="outlined">
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              align="center"
              color="textSecondary"
            >
              Create New User
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

            <form noValidate autoComplete="off" onSubmit={onSumbitRegister}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="First Name"
                    type="text"
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        firstName: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    type="text"
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        lastName: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        email: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        password: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    type="submit"
                  >
                    Add User
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Box>
    ) : (
      !authData.isLoading && <Redirect to="/admin" />
    )
  ) : (
    !authData.isLoading && <Redirect to="/" />
  );
};

export default Register;
