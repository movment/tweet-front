import React from 'react';
import Center from '../../components/pages/Post';
import Layout from '../../components/Layout';
import client from '../../lib/api/client';
import { check } from '../../reducers/auth/auth.slice';
import { wrapper } from '../../reducers/store';
import { getToken, verifyToken } from '../../lib/jwt/check';
import { getPost } from '../../reducers/post/post.slice';
import { getHashtags } from '../../reducers/hashtag/hashtag.slice';
import { getComments } from '../../reducers/comment/comment.slice';

const Post = () => {
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
    if (context.req && cookie) {
      client.defaults.headers.Cookie = cookie;
    }
    await Promise.all([
      context.store.dispatch(getPost({ PostId: context.params.id })),
      context.store.dispatch(getComments({ PostId: context.params.id })),
      context.store.dispatch(getHashtags()),
    ]);
  },
);
export default Post;
