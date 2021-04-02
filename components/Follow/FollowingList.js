import React from 'react';
import { useSelector } from 'react-redux';
import Follow from './Follow';

const FollowingList = () => {
  const followings = useSelector(({ profile }) => profile.followings);
  if (!followings) return null;

  return (
    <div>
      {followings.map((follower) => (
        <Follow key={follower.id} user={follower} />
      ))}
    </div>
  );
};

export default FollowingList;
