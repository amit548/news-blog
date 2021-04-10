import { Box, CircularProgress, Grid, Typography } from '@material-ui/core';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import News from '../../components/News';
import SideBar from '../../components/SideBar';

const NewsSlug = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [loadedData, setLoadedData] = useState([]);
  const [postsAscategory, setPostsAscategory] = useState<any>({});
  const [error, setError] = useState<any>({});

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
          <SideBar />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NewsSlug;
