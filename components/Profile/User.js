import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Link from 'next/link';

const Wrapper = styled.div`
  height: 380px;
  display: flex;
  flex-direction: column;
`;
const WTop = styled.div`
  height: 50%;
  display: flex;
  align-items: flex-end;
  background-color: #c4cfd6;
`;
const WBottom = styled.div`
  height: 50%;
  display: flex;
  flex-direction: column;
  /* justify-content: flex-end; */
  padding: 0 12px;
  & > span {
    position: absolute;
    transform: translate(0, -50%);
  }
`;

const Edit = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 50px;
`;
const ContentWrapper = styled.div`
  margin-top: 65px;
  font-size: 15px;
  & > div {
    height: 50px;
    display: flex;
    align-items: center;
  }
`;
const Nickname = styled.div`
  font-size: 20px;
  font-weight: 600;
  & a {
    color: rgba(0, 0, 0, 0.7);
    &:hover {
      text-decoration: underline;
    }
  }
`;
const LinkWrapper = styled.div`
  & a {
    color: black;
    &:hover {
      text-decoration: underline;
    }
  }
`;
const FollowWrapper = styled.div``;
const User = () => {
  const { user, following, follower } = useSelector(({ profile }) => profile);

  if (!user) return null;
  return (
    <Wrapper>
      <WTop></WTop>
      <WBottom>
        <Avatar size={130} icon={<UserOutlined />} />

        <ContentWrapper>
          <Nickname>
            <Link href={`/user/${user.id}`}>
              <a>{user?.nickname}</a>
            </Link>
          </Nickname>
          <FollowWrapper>
            <LinkWrapper>
              <Link href={`/user/${user.id}/following`}>
                <a>{following} 팔로우</a>
              </Link>{' '}
              <Link href={`/user/${user.id}/follower`}>
                <a>{follower} 팔로워</a>
              </Link>
            </LinkWrapper>
          </FollowWrapper>
        </ContentWrapper>
      </WBottom>
    </Wrapper>
  );
};

export default User;
