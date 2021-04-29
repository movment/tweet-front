import React from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import FollowerList from '../Follow/FollowerList';
import Profile from '../Profile';
import Title from '../Title';
import Br from '../Br';

const User = () => {
  const user = useSelector(({ profile }) => profile.user);

  if (!user) return null;
  return (
    <>
      <Head>
        <title>팔로워 | 트윗</title>
      </Head>
      <Title>팔로워</Title>
      <Profile />
      <Br />
      <FollowerList />
    </>
  );
};

export default React.memo(User);
