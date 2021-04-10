import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import News from '../../components/News';
import SideBar from '../../components/SideBar';

const NewsSlug = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [loadedData, setLoadedData] = useState([]);
  const [postsAscategory, setPostsAscategory] = useState<any>({});
  const [error, setError] = useState<any>({});
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const result = await axios.get(
          `http://localhost:4000/api/post/news?category=${router.query.slug}`
        );
        setLoadedData(result.data);
        setError({});
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    })();
  }, [router.query.slug]);

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get('http://localhost:4000/api/post/video');
        setVideoList(result.data);
      } catch (error) {}
    })();
  }, []);

  useEffect(() => {
    const সরকারি_চাকরি = loadedData.filter(
      (post) => post.category === 'সরকারি চাকরি'
    );
    if (সরকারি_চাকরি.length > 0)
      setPostsAscategory({ 'সরকারি চাকরি': সরকারি_চাকরি });

    const বেসরকারি_চাকরি = loadedData.filter(
      (post) => post.category === 'বেসরকারি চাকরি'
    );
    if (বেসরকারি_চাকরি.length > 0)
      setPostsAscategory({ 'বেসরকারি চাকরি': বেসরকারি_চাকরি });

    const পরীক্ষার_সিলেবাস = loadedData.filter(
      (post) => post.category === 'পরীক্ষার সিলেবাস'
    );
    if (পরীক্ষার_সিলেবাস.length > 0)
      setPostsAscategory({ 'পরীক্ষার সিলেবাস': পরীক্ষার_সিলেবাস });

    const রেজাল্ট = loadedData.filter((post) => post.category === 'রেজাল্ট');
    if (রেজাল্ট.length > 0) setPostsAscategory({ রেজাল্ট: রেজাল্ট });

    const নোটিশ = loadedData.filter((post) => post.category === 'নোটিশ');
    if (নোটিশ.length > 0) setPostsAscategory({ নোটিশ: নোটিশ });
  }, [loadedData]);

  return (
    <Grid container spacing={1}>
      {loading && (
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        </Grid>
      )}
      <Grid item xs={12} md={9}>
        <Grid container spacing={1}>
          {!loading &&
            Object.keys(postsAscategory).map((categoryPostKey, i) => (
              <News
                key={i}
                chipName={categoryPostKey}
                posts={postsAscategory[categoryPostKey]}
              />
            ))}
        </Grid>
      </Grid>
      <Grid item xs={12} md={3}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h5">Useful videos</Typography>
          </Grid>
          {videoList.length > 0 ? (
            videoList.map((video) => <SideBar video={video} key={video._id} />)
          ) : (
            <Grid item xs={12}>
              <Typography>No videos found</Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NewsSlug;
