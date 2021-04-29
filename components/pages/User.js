import React from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import PostList from '../Post/PostList';
import Profile from '../Profile';
import Title from '../Title';
import Br from '../Br';

const User = () => {
  const user = useSelector(({ profile }) => profile.user);

  if (!user) return null;
  return (
    <>
      <Head>
        <title>{user.nickname} | Tweet</title>
        <meta name="description" content={`${user.nickname} 프로필`} />
        <meta property="og:title" content={`${user.nickname} | Tweet`} />
        <meta property="og:description" content={`${user.nickname} 프로필`} />
        <meta
          property="og:url"
          content={`https://doinki.com/user/${user.id}`}
        />
      </Head>
      <Title>트윗</Title>
      <Profile />
      <Br />
      <PostList userid={user.id} />
    </>
  );
};

export default User;
