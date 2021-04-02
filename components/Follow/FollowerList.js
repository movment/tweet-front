import React from 'react';
import { useSelector } from 'react-redux';
import Follow from './Follow';

const FollowerList = () => {
  const followers = useSelector(({ profile }) => profile.followers);
  if (!followers) return null;

  return (
    <div>
      {followers.map((follower) => (
        <Follow key={follower.id} user={follower} />
      ))}
    </div>
  );
};

export default FollowerList;
