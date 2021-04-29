import React from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import FollowingList from '../Follow/FollowingList';
import Profile from '../Profile';
import Title from '../Title';
import Br from '../Br';

const User = () => {
  const { user } = useSelector(({ profile }) => profile);

  if (!user) return null;
  return (
    <>
      <Head>
        <title>Following | Tweet</title>
      </Head>
      <Title>팔로잉</Title>
      <Profile />
      <Br />
      <FollowingList />
    </>
  );
};

export default User;
