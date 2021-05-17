import { useContext, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import EditOutlined from '@material-ui/icons/EditOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import { FormEvent } from 'react';
import axios from 'axios';
import { makeStyles, Theme } from '@material-ui/core/styles';

import Redirect from '../../components/Redirect';
import { AuthContext } from '../../context/AuthContext';

const useStyles = makeStyles((theme: Theme) => ({
  progress: {
    marginBottom: theme.spacing(2),
  },
  alert: {
    marginBottom: theme.spacing(3),
  },
}));

const Admin = () => {
  const classes = useStyles();
  const { isLoading, user } = useContext(AuthContext);
  const [isEditMode, setIsEditMode] = useState(false);

  const [registerData, setRegisterData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>({});

  useEffect(() => {
    const data: any = {};
    if (user) {
      if (user.firstName) data.firstName = user.firstName;
      if (user.lastName) data.lastName = user.lastName;
      if (user.email) data.email = user.email;
    }
    setRegisterData({ ...data });
  }, [user]);

  const onSumbitUpdateProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      await axios.put(`/api/user/list/${user._id}`, registerData, {
        withCredentials: true,
      });
      setError({});
      setLoading(false);
      window.location.reload();
    } catch (error) {
      if (error.response)
        setError({
          ...error.response.data.body,
        });
      setLoading(false);
    }
  };

  return user ? (
    <Grid container spacing={2}>
      {user && (
        <>
          <Grid item xs={12} md={6}>
            {loading && (
              <Box
                display="flex"
                justifyContent="center"
                className={classes.progress}
              >
                <CircularProgress />
              </Box>
            )}

            <Box>
              <Card variant="outlined">
                <CardHeader
                  avatar={<Avatar>{user.firstName[0]}</Avatar>}
                  title={`${user.firstName} ${user.lastName}`}
                  subheader={user.email}
                  action={
                    <IconButton onClick={() => setIsEditMode(!isEditMode)}>
                      <EditOutlined color="primary" />
                    </IconButton>
                  }
                />
                <CardContent>
                  <Box>
                    <Typography component="span">
                      Role:{' '}
                      <Typography component="span" variant="h6">
                        {user.role}
                      </Typography>
                    </Typography>
                  </Box>
                  {user.role === 'admin' && (
                    <Box>
                      <Typography component="span">
                        Total Created Users:{' '}
                        <Typography component="span" variant="h6">
                          {user.createdUsers.length || 0}
                        </Typography>
                      </Typography>
                    </Box>
                  )}

                  <Box>
                    <Typography component="span">
                      Total Created Posts:{' '}
                      <Typography component="span" variant="h6">
                        {user.createdPosts.length || 0}
                      </Typography>
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <form
                noValidate
                autoCorrect="off"
                onSubmit={onSumbitUpdateProfile}
              >
                <Card variant="outlined">
                  <CardHeader
                    avatar={<Avatar>{user.firstName[0]}</Avatar>}
                    title={`${user.firstName} ${user.lastName}`}
                    subheader={user.email}
                  />
                  <CardContent>
                    {Object.keys(error).map((err) => (
                      <Alert
                        severity="error"
                        key={err}
                        className={classes.alert}
                      >
                        {error[err]}
                      </Alert>
                    ))}
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          error={!!error.firstName}
                          variant="outlined"
                          fullWidth
                          label="First Name"
                          value={registerData.firstName || ''}
                          focused={!!registerData.firstName}
                          onChange={(e) =>
                            setRegisterData({
                              ...registerData,
                              firstName: e.target.value,
                            })
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          error={!!error.lastName}
                          variant="outlined"
                          fullWidth
                          label="Last Name"
                          value={registerData.lastName || ''}
                          focused={!!registerData.lastName}
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
                          error={!!error.email}
                          variant="outlined"
                          fullWidth
                          label="Email Address"
                          value={registerData.email || ''}
                          focused={!!registerData.email}
                          onChange={(e) =>
                            setRegisterData({
                              ...registerData,
                              email: e.target.value,
                            })
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          error={!!error.password}
                          variant="outlined"
                          fullWidth
                          label="Password"
                          value={registerData.password || ''}
                          onChange={(e) =>
                            setRegisterData({
                              ...registerData,
                              password: e.target.value,
                            })
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          error={!!error.password}
                          variant="outlined"
                          fullWidth
                          label="Confirm Password"
                          value={registerData.confirmPassword || ''}
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
                          variant="outlined"
                          color="primary"
                          disabled={!isEditMode}
                          type="submit"
                        >
                          Update Profile
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </form>
            </Box>
          </Grid>
        </>
      )}
    </Grid>
  ) : (
    !user && !isLoading && <Redirect to="/" />
  );
};

export default Admin;
