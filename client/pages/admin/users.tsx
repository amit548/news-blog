import { Box, Grid } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

import UserList from '../../components/UserList';

const Users = () => {
  return (
    <>
      <Grid container>
        <UserList />
        <UserList />
        <UserList />
        <UserList />
        <UserList />
        <UserList />
        <UserList />
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center">
            <Pagination variant="outlined" color="primary" count={20} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Users;
