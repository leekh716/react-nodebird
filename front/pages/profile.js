import Head from "next/head";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Router from "next/router";
import AppLayout from "../component/AppLayout";
import FollowList from "../component/FollowList";
import NicknameEditForm from "../component/NicknameEditForm";

const Profile = () => {
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push("/");
    }
  }, []);

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
