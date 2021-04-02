import { Grid, Typography } from '@material-ui/core';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth';

const Admin = () => {
  const { user } = useContext(AuthContext);

  return (
    <Grid container>
      {user && (
        <Typography variant="h6">
          Role - {user.role}
          <br />
          Name - {user.firstName} {user.lastName}
        </Typography>
      )}
    </Grid>
  );
};

export default Admin;
