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
        <title>Search | Tweet</title>
        <meta name="description" content={`${router.query?.id} 트윗 목록`} />
        <meta property="og:title" content={`Search | Tweet`} />
        <meta
          property="og:description"
          content={`${router.query?.id} 트윗 목록`}
        />
        <meta
          property="og:url"
          content={`https://doinki.com/search/${encodeURIComponent(
            router.query?.id,
          )}`}
        />
      </Head>
      <Title>{router.query?.id}</Title>
      <PostList search={router.query?.id} />
    </>
  );
};

export default User;
