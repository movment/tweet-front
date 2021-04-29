import { useRouter } from 'next/dist/client/router';
import React from 'react';
import Head from 'next/head';
import PostList from '../Post/PostList';
import Title from '../Title';

const Hashtag = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Hashtag | Tweet</title>
        <meta name="description" content={`Hashtag 목록`} />
        <meta property="og:title" content={`Hashtag | Tweet`} />
        <meta property="og:description" content={`Hashtag 목록`} />
        <meta
          property="og:url"
          content={`https://doinki.com/hashtag/${router.query?.id || '#'}`}
        />
      </Head>
      <Title>{router.query?.id ? `#${router.query?.id}` : '해시태그'}</Title>
      <PostList hashtag={router.query?.id} />
    </>
  );
};

export default Hashtag;
