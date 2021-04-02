import React from 'react';
import { useSelector } from 'react-redux';
import FollowingList from '../Follow/FollowingList';
import Profile from '../Profile';
import Title from '../Title';

const User = () => {
  const { user } = useSelector(({ profile }) => profile);

  if (!user) return null;
  return (
    <>
      <Title>팔로잉</Title>
      <Profile />
      <FollowingList />
    </>
  );
};

export default User;
