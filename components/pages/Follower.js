import React from 'react';
import { useSelector } from 'react-redux';
import FollowerList from '../Follow/FollowerList';
import Profile from '../Profile';
import Title from '../Title';

const User = () => {
  const user = useSelector(({ profile }) => profile.user);

  if (!user) return null;
  return (
    <>
      <Title>팔로워</Title>
      <Profile />
      <FollowerList />
    </>
  );
};

export default React.memo(User);
