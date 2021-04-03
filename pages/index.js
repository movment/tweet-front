import React from 'react';
import Center from '../components/pages/Home';
import Layout from '../components/Layout';
import { getPosts } from '../reducers/post/post.slice';
import { wrapper } from '../reducers/store';
import client from '../lib/api/client';
import { check } from '../reducers/auth/auth.slice';
import { getToken, verifyToken } from '../lib/jwt/check';
import { getHashtags } from '../reducers/hashtag/hashtag.slice';

const Home = () => {
  return (
    <Layout>
      <Center />
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    client.defaults.headers.Cookie = '';
    const token = getToken(cookie);
    const user = verifyToken(token);
    /**
     * if(!user) 쿠키 삭제
     */
    context.store.dispatch(check(user));
    if (context.req && cookie) client.defaults.headers.Cookie = cookie;
    await Promise.all([
      context.store.dispatch(getPosts()),
      context.store.dispatch(getHashtags()),
    ]);
  },
);
export default Home;
