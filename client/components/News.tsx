import { Grid, Chip } from '@material-ui/core';

import PostCard from './PostCard';

const News = ({ chipName, posts }) => {
  return (
    <>
      <Grid item xs={12}>
        <Chip clickable color="primary" label={chipName} />
      </Grid>

      {posts.map((post: any) => (
        <PostCard key={post._id} post={post} />
      ))}
    </>
  );
};

export default News;
