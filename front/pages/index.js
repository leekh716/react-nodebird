import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AppLayout from "../component/AppLayout";
import PostCard from "../component/PostCard";
import PostForm from "../component/PostForm";
import { LOAD_POSTS_REQUEST } from "../reducers/post";

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    dispatch({ type: LOAD_POSTS_REQUEST });
  }, []);

  useEffect(() => {
    function onScroll() {
      console.log(
        window.scrollY,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        hasMorePosts
      );
      if (
        window.scrollY + document.documentElement.clientHeight + 300 >
        document.documentElement.scrollHeight
      ) {
        hasMorePosts &&
          !loadPostsLoading &&
          dispatch({ type: LOAD_POSTS_REQUEST });
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasMorePosts]);

  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};
export default Home;
