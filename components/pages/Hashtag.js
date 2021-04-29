import { useRouter } from 'next/dist/client/router';
import React from 'react';
import Head from 'next/head';
import PostList from '../Post/PostList';
import Title from '../Title';

const Hashtag = () => {
  const router = useRouter();

  console.log(router.query?.id);
  return (
    <>
      <Head>
        <title>Hashtag | Tweet</title>
      </Head>
      <Title>{router.query?.id ? `#${router.query?.id}` : '해시태그'}</Title>
      <PostList hashtag={router.query?.id} />
    </>
  );
};

export default Hashtag;
