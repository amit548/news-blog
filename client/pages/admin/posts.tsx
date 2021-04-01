import { Box, Grid } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

import AdminPostCard from '../../components/AdminPostCard';

const Posts = () => {
  return (
    <Grid container spacing={1}>
      <AdminPostCard />
      <AdminPostCard />
      <AdminPostCard />
      <AdminPostCard />
      <AdminPostCard />
      <AdminPostCard />
      <AdminPostCard />
      <AdminPostCard />
      <AdminPostCard />
      <AdminPostCard />
      <Grid item xs={12}>
        <Box display="flex" justifyContent="center">
          <Pagination variant="outlined" color="primary" count={20} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Posts;
