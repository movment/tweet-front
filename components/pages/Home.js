import React from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import Br from '../Br';
import PostForm from '../Form/PostForm';
import PostList from '../Post/PostList';
import Title from '../Title';

const Home = () => {
  const isLoggedIn = useSelector(({ auth }) => auth.isLoggedIn);
  return (
    <>
      <Head>
        <title>Tweet</title>
        <meta name="description" content={`Tweet Home`} />
        <meta property="og:title" content={`Tweet`} />
        <meta property="og:description" content={`Tweet Home`} />
        <meta property="og:url" content={`https://doinki.com/`} />
      </Head>
      <Title home>홈</Title>
      {isLoggedIn && (
        <>
          <PostForm />
          <Br />
        </>
      )}
      <PostList />
    </>
  );
};

export default Home;
