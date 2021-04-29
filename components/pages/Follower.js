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
        <title>Follower | Tweet</title>
        <meta name="description" content={`${user.nickname}의 팔로워 목록`} />
        <meta property="og:title" content={`Follower | Tweet`} />
        <meta
          property="og:description"
          content={`${user.nickname}의 팔로워 목록`}
        />
        <meta
          property="og:url"
          content={`https://doinki.com/user/${user.id}/follower`}
        />
      </Head>
      <Title>팔로워</Title>
      <Profile />
      <Br />
      <FollowerList />
    </>
  );
};

export default React.memo(User);
