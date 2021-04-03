import React from 'react';
import Center from '../../components/pages/User';
import Layout from '../../components/Layout';
import client from '../../lib/api/client';
import { check } from '../../reducers/auth/auth.slice';
import { wrapper } from '../../reducers/store';
import { getToken, verifyToken } from '../../lib/jwt/check';
import { getPosts } from '../../reducers/post/post.slice';
import { getHashtags } from '../../reducers/hashtag/hashtag.slice';
import { getProfile } from '../../reducers/profile/profile.slice';

const User = () => {
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
    context.store.dispatch(check(user));
    if (context.req && cookie) client.defaults.headers.Cookie = cookie;
    await Promise.all([
      context.store.dispatch(getProfile({ UserId: context.params.id })),
      context.store.dispatch(getPosts({ UserId: context.params.id })),
      context.store.dispatch(getHashtags()),
    ]);
  },
);
export default User;
