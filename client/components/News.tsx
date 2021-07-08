import dynamic from 'next/dynamic';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';

import PostCard from './PostCard';

const AdBanner = dynamic(() => import('./AdBanner'), { ssr: false });

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

      <Grid item xs={12} style={{ overflow: 'hidden' }}>
        <AdBanner adSlot="7344441587" />
      </Grid>
    </>
  );
};

export default News;
