import { Grid, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Redirect from '../../components/Redirect';

const Admin = () => {
  const authData = useSelector((state: any) => state.auth);

  return authData.user ? (
    <Grid container>
      {authData.user && (
        <Typography variant="h6">
          Role - {authData.user.role}
          <br />
          Name - {authData.user.firstName} {authData.user.lastName}
        </Typography>
      )}
    </Grid>
  ) : (
    !authData.isLoading && <Redirect to="/" />
  );
};

export default Admin;
