import { useRouter } from 'next/router';
import axios from 'axios';
import Head from 'next/head';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import { Fragment } from 'react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';

import News from '../../../components/News';
import SideBar from '../../../components/SideBar';

const AdBanner = dynamic(import('../../../components/AdBanner'), {
  ssr: false,
});

const postsPerPage = 20;

export const getServerSideProps: GetServerSideProps = async ({
  params: { slug, page },
}) => {
  const {
    data: { totalPosts, posts },
  } = await axios.get(
    encodeURI(
      `/api/post/news?category=${slug}&page=${page}&limit=${postsPerPage}`
    )
  );

  let pageCount = Math.ceil((totalPosts || 0) / postsPerPage);

  const { data: videos } = await axios.get(encodeURI('/api/post/video'));

  let postsAscategory = {};

  const সরকারি_চাকরি = posts.filter((post) => post.category === 'সরকারি চাকরি');
  if (সরকারি_চাকরি.length > 0)
    postsAscategory = { 'সরকারি চাকরি': সরকারি_চাকরি };

  const বেসরকারি_চাকরি = posts.filter(
    (post) => post.category === 'বেসরকারি চাকরি'
  );
  if (বেসরকারি_চাকরি.length > 0)
    postsAscategory = { 'বেসরকারি চাকরি': বেসরকারি_চাকরি };

  const পার্ট_টাইম_জব = posts.filter(
    (post) => post.category === 'পার্ট টাইম জব'
  );
  if (পার্ট_টাইম_জব.length > 0)
    postsAscategory = { 'পার্ট টাইম জব': পার্ট_টাইম_জব };

  const পরীক্ষার_প্রস্তুতি = posts.filter(
    (post) => post.category === 'পরীক্ষার প্রস্তুতি'
  );
  if (পরীক্ষার_প্রস্তুতি.length > 0)
    postsAscategory = { 'পরীক্ষার প্রস্তুতি': পরীক্ষার_প্রস্তুতি };

  // const রেজাল্ট = posts.filter((post) => post.category === 'রেজাল্ট');
  // if (রেজাল্ট.length > 0) postsAscategory = { রেজাল্ট: রেজাল্ট };

  const নোটিশ = posts.filter((post) => post.category === 'নোটিশ');
  if (নোটিশ.length > 0) postsAscategory = { নোটিশ: নোটিশ };

  return {
    props: {
      postsAscategory,
      videos,
      pageCount,
      page,
    },
  };
};

async function getPageCountValue(slug: string) {
  const paths = [];

  const {
    data: { totalPosts },
  } = await axios.get(
    encodeURI(`/api/post/news?category=${slug}&page=${1}&limit=${postsPerPage}`)
  );

  const count = Math.ceil((totalPosts || 0) / postsPerPage);

  for (let c = 1; c <= count; c++) {
    paths.push({ params: { slug, page: c.toString() } });
  }

  if (count < 1) {
    paths.push({ params: { slug, page: '1' } });
  }

  return paths;
}

const description =
  'যদি আপনি একজন চাকরি ও কাজের সমন্ধী হয়ে থাকেন তাহলে একদম সঠিক Website-এ এসেছেন, www.kormerkhoj.com আমাদের লক্ষ্য আপনাকে সঠিক তথ্য দেওয়া, প্রতারণার হাত থেকে সাবধান করা আর আপনাদের লক্ষ্য পূরণ করা | আমাদের সতর্কতা আর আপনাদের চেষ্টা, সঙ্গে থাকুন';

const ExentSlugPage = ({ postsAscategory, videos, pageCount, page }) => {
  const router = useRouter();

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={9}>
          <Grid container spacing={1}>
            {Object.keys(postsAscategory).length > 0 ? (
              <>
                {Object.keys(postsAscategory).map((categoryPostKey, i) => (
                  <Fragment key={i}>
                    <Head>
                      <title>{categoryPostKey}</title>
                      <meta
                        name="description"
                        content={description.substring(0, 159).concat('...')}
                      />
                      <meta property="og:title" content={categoryPostKey} />
                      <meta
                        property="og:description"
                        content={description.substring(0, 159).concat('...')}
                      />
                      <meta
                        property="twitter:title"
                        content={categoryPostKey}
                      />
                      <meta
                        property="twitter:description"
                        content={description.substring(0, 159).concat('...')}
                      />
                      <meta
                        property="og:image"
                        content="/android-chrome-512x512.png"
                      />
                      <meta
                        property="twitter:image"
                        content="/android-chrome-512x512.png"
                      />
                      <meta name="keywords" content={categoryPostKey} />
                    </Head>
                    <Grid item xs={12} style={{ overflow: 'hidden' }}>
                      <AdBanner adSlot="6564151882" />
                    </Grid>
                    <News
                      key={i}
                      chipName={categoryPostKey}
                      posts={postsAscategory[categoryPostKey]}
                    />
                  </Fragment>
                ))}
                {pageCount > 1 && (
                  <Grid
                    item
                    xs={12}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Pagination
                      count={pageCount}
                      page={parseInt(page)}
                      onChange={(_, value) => {
                        if (process.browser) {
                          window.location.href = `/news/${router.query.slug}/${value}`;
                        }
                      }}
                    />
                  </Grid>
                )}
              </>
            ) : (
              <Typography variant="h5">No Post Found</Typography>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} style={{ overflow: 'hidden' }}>
              <AdBanner adSlot="2022271648" />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5">Useful videos</Typography>
            </Grid>
            {videos.length > 0 ? (
              videos.map((video) => <SideBar video={video} key={video._id} />)
            ) : (
              <Grid item xs={12}>
                <Typography>No videos found</Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ExentSlugPage;
