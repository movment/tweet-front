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
        <meta name="description" content={`${user.nickname}의 팔로우 목록`} />
        <meta property="og:title" content={`Following | Tweet`} />
        <meta
          property="og:description"
          content={`${user.nickname}의 팔로우 목록`}
        />
        <meta
          property="og:url"
          content={`https://doinki.com/user/${user.id}/following`}
        />
      </Head>
      <Title>팔로잉</Title>
      <Profile />
      <Br />
      <FollowingList />
    </>
  );
};

export default User;
