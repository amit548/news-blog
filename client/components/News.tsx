import { Grid, Chip } from '@material-ui/core';
import { useRouter } from 'next/router';

import PostCard from './PostCard';

const News = ({ chipName, posts }) => {
  const router = useRouter();

  return (
    <>
      <Grid item xs={12}>
        <Chip
          clickable
          color="primary"
          label={chipName}
          onClick={() => {
            router.push(`/news/${chipName}`);
          }}
        />
      </Grid>

      {posts &&
        posts.map((post: any) => <PostCard key={post._id} post={post} />)}
    </>
  );
};

export default News;
