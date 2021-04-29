import React from 'react';
import { useSelector } from 'react-redux';
import Follow from './Follow';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
`;

const FollowingList = () => {
  const followings = useSelector(({ profile }) => profile.followings);
  if (!followings?.length) return <Wrapper>No Followings</Wrapper>;

  return (
    <div>
      {followings.map((follower) => (
        <Follow key={follower.id} user={follower} />
      ))}
    </div>
  );
};

export default FollowingList;
