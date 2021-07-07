import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';

import PostCard from './PostCard';

const News = ({ chipName, posts }) => {
  return (
    <>
      <Grid item xs={12}>
        <Chip
          clickable
          color="primary"
          label={chipName}
          onClick={() => {
            if (process.browser) {
              window.location.href = `/news/${chipName}/1`;
            }
          }}
        />
      </Grid>

      {posts &&
        posts.map((post: any) => <PostCard key={post._id} post={post} />)}
    </>
  );
};

export default News;
