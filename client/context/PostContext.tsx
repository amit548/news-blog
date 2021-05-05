import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const PostContext = createContext({
  isPostLoading: false,
  isVideoLoading: false,
  posts: [],
  postsAscategory: {},
  videos: [],
  error: null,
});

const PostContextProvider = ({ children }) => {
  const [isPostLoading, setIsPostLoading] = useState(true);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const [postsAscategory, setPostsAscategory] = useState<any>({});
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsPostLoading(true);
      try {
        const result1 = await axios.get('/api/post/news?category=সরকারি চাকরি');
        const result2 = await axios.get(
          '/api/post/news?category=বেসরকারি চাকরি'
        );
        const result3 = await axios.get(
          '/api/post/news?category=পরীক্ষার প্রস্তুতি'
        );
        // const result4 = await axios.get('/api/post/news?category=রেজাল্ট');
        const result5 = await axios.get('/api/post/news?category=নোটিশ');
        setPosts([
          ...result1.data.posts,
          ...result2.data.posts,
          ...result3.data.posts,
          // ...result4.data.posts,
          ...result5.data.posts,
        ]);
        setIsPostLoading(false);
      } catch (error) {
        if (error.response) setError(error.response.data.body);
        setIsPostLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const সরকারি_চাকরি = posts.filter(
      (post) => post.category === 'সরকারি চাকরি'
    );
    if (সরকারি_চাকরি.length > 0)
      setPostsAscategory((prevPostsAsCategory: any) => ({
        ...prevPostsAsCategory,
        'সরকারি চাকরি': সরকারি_চাকরি,
      }));

    const বেসরকারি_চাকরি = posts.filter(
      (post) => post.category === 'বেসরকারি চাকরি'
    );
    if (বেসরকারি_চাকরি.length > 0)
      setPostsAscategory((prevPostsAsCategory: any) => ({
        ...prevPostsAsCategory,
        'বেসরকারি চাকরি': বেসরকারি_চাকরি,
      }));

    const পরীক্ষার_প্রস্তুতি = posts.filter(
      (post) => post.category === 'পরীক্ষার প্রস্তুতি'
    );
    if (পরীক্ষার_প্রস্তুতি.length > 0)
      setPostsAscategory((prevPostsAsCategory: any) => ({
        ...prevPostsAsCategory,
        'পরীক্ষার প্রস্তুতি': পরীক্ষার_প্রস্তুতি,
      }));

    // const রেজাল্ট = posts.filter((post) => post.category === 'রেজাল্ট');
    // if (রেজাল্ট.length > 0)
    //   setPostsAscategory((prevPostsAsCategory: any) => ({
    //     ...prevPostsAsCategory,
    //     রেজাল্ট: রেজাল্ট,
    //   }));

    const নোটিশ = posts.filter((post) => post.category === 'নোটিশ');
    if (নোটিশ.length > 0)
      setPostsAscategory((prevPostsAsCategory: any) => ({
        ...prevPostsAsCategory,
        নোটিশ: নোটিশ,
      }));
  }, [posts]);

  useEffect(() => {
    const fetchVideoUrls = async () => {
      setIsVideoLoading(true);
      try {
        const res = await axios.get('/api/post/video');
        setVideos(res.data);
        setIsVideoLoading(false);
      } catch (error) {
        if (error.response) setError(error.response.data.body);
        setIsVideoLoading(false);
      }
    };

    fetchVideoUrls();
  }, []);

  return (
    <PostContext.Provider
      value={{
        isPostLoading,
        isVideoLoading,
        posts,
        postsAscategory,
        videos,
        error,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
