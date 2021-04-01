import { Grid, Chip, Avatar } from '@material-ui/core';

import PostCard from './PostCard';

const News = () => {
  return (
    <>
      <Grid item xs={12}>
        <Chip
          clickable
          color="primary"
          avatar={<Avatar>স</Avatar>}
          label="সরকারি চাকরি"
        />
      </Grid>
      <PostCard />
    </>
  );
};

export default News;
