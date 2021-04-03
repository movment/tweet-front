import React from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import FollowingList from '../Follow/FollowingList';
import Profile from '../Profile';
import Title from '../Title';

const User = () => {
  const { user } = useSelector(({ profile }) => profile);

  if (!user) return null;
  return (
    <>
      <Head>
        <title>팔로잉 | 트윗</title>
      </Head>
      <Title>팔로잉</Title>
      <Profile />
      <FollowingList />
    </>
  );
};

export default User;
