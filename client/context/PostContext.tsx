import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const PostContext = createContext({
  isTrendingPostLoading: false,
  isPostLoading: false,
  isVideoLoading: false,
  trendingPost: [],
  posts: [],
  postsAscategory: {},
  videos: [],
  error: null,
});

const PostContextProvider = ({ children }) => {
  const [isTrendingPostLoading, setIsTrendingPostLoading] = useState(true);
  const [trendingPost, setTrendingPost] = useState([]);
  const [isPostLoading, setIsPostLoading] = useState(true);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const [postsAscategory, setPostsAscategory] = useState<any>({});
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      setIsTrendingPostLoading(true);
      try {
        const res = await axios.get('/api/post/trending_news');
        setTrendingPost(res.data);
        setIsTrendingPostLoading(false);
      } catch (error) {
        if (error.response) setError(error.response.data.body);
        setIsTrendingPostLoading(false);
      }
    };

    fetchTrendingPosts();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsPostLoading(true);
      try {
        const result1 = await axios.get('/api/post/news?category=সরকারি চাকরি');
        const result2 = await axios.get(
          '/api/post/news?category=বেসরকারি চাকরি'
        );
        const result3 = await axios.get(
          '/api/post/news?category=পার্ট টাইম জব'
        );
        const result4 = await axios.get(
          '/api/post/news?category=পরীক্ষার প্রস্তুতি'
        );
        const result5 = await axios.get('/api/post/news?category=নোটিশ');
        setPosts([
          ...result1.data.posts,
          ...result2.data.posts,
          ...result3.data.posts,
          ...result4.data.posts,
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

    const পার্ট_টাইম_জব = posts.filter(
      (post) => post.category === 'পার্ট টাইম জব'
    );
    if (পার্ট_টাইম_জব.length > 0)
      setPostsAscategory((prevPostsAsCategory: any) => ({
        ...prevPostsAsCategory,
        'পার্ট টাইম জব': পার্ট_টাইম_জব,
      }));

    const পরীক্ষার_প্রস্তুতি = posts.filter(
      (post) => post.category === 'পরীক্ষার প্রস্তুতি'
    );
    if (পরীক্ষার_প্রস্তুতি.length > 0)
      setPostsAscategory((prevPostsAsCategory: any) => ({
        ...prevPostsAsCategory,
        'পরীক্ষার প্রস্তুতি': পরীক্ষার_প্রস্তুতি,
      }));

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
        isTrendingPostLoading,
        isPostLoading,
        isVideoLoading,
        trendingPost,
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
