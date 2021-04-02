import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { useSelector } from 'react-redux';

import PostList from '../Post/PostList';
import Profile from '../Profile';
import Title from '../Title';

const User = () => {
  const user = useSelector(({ profile }) => profile.user);

  if (!user) return null;
  return (
    <>
      <Title>트윗</Title>
      <Profile />
      <PostList userid={user.id} />
    </>
  );
};

export default User;
