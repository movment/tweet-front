import { useRouter } from 'next/router';
import React from 'react';
import Head from 'next/head';
import PostList from '../Post/PostList';
import Title from '../Title';

const User = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>검색 | 트윗</title>
      </Head>
      <Title>{router.query?.id}</Title>
      <PostList search={router.query?.id} />
    </>
  );
};

export default User;
