import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  makeStyles,
  TextField,
  Theme,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import { FormEvent, useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Redirect from '../../../components/Redirect';

const useStyles = makeStyles((theme: Theme) => ({
  divider: {
    marginBottom: theme.spacing(2),
  },
  card: {
    [theme.breakpoints.up('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      width: '60%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '40%',
    },
    [theme.breakpoints.up('xl')]: {
      width: '30%',
    },
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
  const authData = useSelector((state: any) => state.auth);

  const [loading, setLoading] = useState(false);
  const [registerData, setRegisterData] = useState({});
  const [error, setError] = useState<any>({});

  const [selectedUser, setSelectedUser] = useState(null);

  const { id } = router.query;

  useEffect(() => {
    (async () => {
      const result = await axios.get(
        `http://localhost:4000/api/user/list/${id}`,
        {
          withCredentials: true,
        }
      );
      setSelectedUser(result.data);
    })();
  }, [id]);

  const onSumbitRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      const result = await axios.post(
        'http://localhost:4000/api/user/register',
        registerData,
        { withCredentials: true }
      );
      console.log(result.data);

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
    selectedUser && (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Card variant="outlined" className={classes.card}>
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
                    value={selectedUser.firstName}
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
                    value={selectedUser.lastName}
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
                    value={selectedUser.email}
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
  ) : (
    <Redirect to="/" />
  );
};

export default EditUser;