import { useRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';

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
            router.push(`/news/${chipName}/1`);
          }}
        />
      </Grid>

      {posts &&
        posts.map((post: any) => <PostCard key={post._id} post={post} />)}
    </>
  );
};

export default News;
