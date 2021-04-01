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
} from '@material-ui/core';

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
}));

const Login = () => {
  const classes = useStyles();
  const router = useRouter();

  const onSumbitLogin = () => {
    router.push('/admin');
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Card variant="outlined" className={classes.card}>
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
          <form noValidate autoComplete="off">
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField fullWidth label="Email" type="email" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Password" type="password" />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  onClick={onSumbitLogin}
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
