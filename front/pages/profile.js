import Head from "next/head";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import AppLayout from "../component/AppLayout";
import FollowList from "../component/FollowList";
import NicknameEditForm from "../component/NicknameEditForm";
import {
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWINGS_REQUEST,
} from "../reducers/user";

const Profile = () => {
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: LOAD_FOLLOWERS_REQUEST });
    dispatch({ type: LOAD_FOLLOWINGS_REQUEST });
  }, []);

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push("/");
    }
  }, [me]);

  if (!me) {
    return null;
  }

  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉" data={me.Followings} />
        <FollowList header="팔로워" data={me.Followers} />
      </AppLayout>
    </>
  );
};

export default Profile;
