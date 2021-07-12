import dynamic from 'next/dynamic';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import pink from '@material-ui/core/colors/pink';

import PostCard from './PostCard';

const AdBanner = dynamic(() => import('./AdBanner'), { ssr: false });

const News = ({ chipName, posts }) => {
  return (
    <>
      <Grid item xs={12}>
        <Typography
          style={{
            cursor: 'pointer',
            display: 'inline-block',
            marginBottom: '5px',
            color: pink[500],
            fontWeight: 'bold',
          }}
          variant="body1"
          onClick={() => {
            if (process.browser) {
              window.location.href = `/news/${chipName}/1`;
            }
          }}
        >
          {chipName}
        </Typography>
        <Divider style={{ backgroundColor: pink[500], padding: '1px' }} />
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
