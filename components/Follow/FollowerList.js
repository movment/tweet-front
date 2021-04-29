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

const FollowerList = () => {
  const followers = useSelector(({ profile }) => profile.followers);
  if (!followers?.length) return <Wrapper>No Followers</Wrapper>;

  return (
    <div>
      {followers.map((follower) => (
        <Follow key={follower.id} user={follower} />
      ))}
    </div>
  );
};

export default FollowerList;
