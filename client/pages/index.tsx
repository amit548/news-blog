import { Grid, Typography } from '@material-ui/core';

import News from '../components/News';
import SideBar from '../components/SideBar';

const Home = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={9}>
        <Grid container spacing={1}>
          <News />
        </Grid>
      </Grid>
      <Grid item xs={12} md={3}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h5">Useful videos</Typography>
          </Grid>
          <SideBar />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
