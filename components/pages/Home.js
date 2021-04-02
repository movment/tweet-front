import React from 'react';
import PostForm from '../Form/PostForm';
import Br from '../Br';
import PostList from '../Post/PostList';
import Title from '../Title';
import { useSelector } from 'react-redux';

const Home = () => {
  const isLoggedIn = useSelector(({ auth }) => auth.isLoggedIn);
  return (
    <>
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
