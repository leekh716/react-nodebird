import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AppLayout from "../component/AppLayout";
import PostCard from "../component/PostCard";
import PostForm from "../component/PostForm";
import { LOAD_POSTS_REQUEST } from "../reducers/post";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading, retweetError } =
    useSelector((state) => state.post);

  useEffect(() => {
    if (retweetError) {
      alert(retweetError);
    }
  }, [retweetError]);

  useEffect(() => {
    dispatch({ type: LOAD_MY_INFO_REQUEST });
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
        const lastId = mainPosts[mainPosts.length - 1]?.id;
        hasMorePosts &&
          !loadPostsLoading &&
          dispatch({ type: LOAD_POSTS_REQUEST, lastId });
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasMorePosts, loadPostsLoading, mainPosts]);

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
