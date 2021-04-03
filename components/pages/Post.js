import React from 'react';
import Head from 'next/head';
import Post from '../Post/Post';
import Title from '../Title';

const User = () => {
  return (
    <>
      <Head>
        <title>포스트 | 트윗</title>
      </Head>
      <Title>트윗</Title>
      <Post />
    </>
  );
};

export default User;
