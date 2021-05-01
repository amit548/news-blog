import { useRouter } from 'next/router';
import { FormEvent, useState, useEffect, useContext } from 'react';
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

import Redirect from '../../../components/Redirect';
import { AuthContext } from '../../../context/AuthContext';

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

const EditUser = () => {
  const router = useRouter();
  const classes = useStyles();

  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [registerData, setRegisterData] = useState<any>({});
  const [error, setError] = useState<any>({});

  const { id } = router.query;

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const result = await axios.get(
          `/api/user/list/${id}`,
          {
            withCredentials: true,
          }
        );
        setRegisterData(result.data);
        setLoading(false);
      } catch (_) {
        router.push('/admin/users');
        setLoading(false);
      }
    })();
  }, [id]);

  const onSumbitRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      await axios.put(
        `/api/user/list/${router.query.id}`,
        registerData,
        { withCredentials: true }
      );
      setError({});
      setLoading(false);
      router.push('/admin/users');
    } catch (error) {
      if (error.response)
        setError({
          ...error.response.data.body,
        });
      setLoading(false);
    }
  };

  return user
    ? registerData && (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Card variant="outlined">
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                align="center"
                color="textSecondary"
              >
                Update User
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
                      value={registerData.firstName}
                      fullWidth
                      focused
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
                      value={registerData.lastName}
                      focused
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
                      value={registerData.email}
                      focused
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
                      Update User
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Box>
      )
    : !loading && <Redirect to="/" />;
};

export default EditUser;
