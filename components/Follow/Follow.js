import Link from 'next/link';
import { Avatar } from 'antd';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import Header from '../Post/Header';
import { useRouter } from 'next/dist/client/router';
import FollowButton from '../Button/FollowButton';

const Wrapper = styled.article`
  display: flex;
  padding: 12px 16px;
  cursor: pointer;
  &:hover {
    background-color: #f7f7f7;
  }
  & + & {
    border-top: 1px solid #ebeef0;
  }
`;
const Left = styled.div`
  margin-right: 12px;
`;
const Right = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const PostItem = ({ user }) => {
  const router = useRouter();
  const onClick = useCallback(
    (e) => {
      e.preventDefault();
      router.push(`/user/${user.id}`);
    },
    [user.id],
  );
  const onBlock = useCallback((e) => {
    e.stopPropagation();
  }, []);

  if (!user) return null;
  return (
    <Wrapper onClick={onClick}>
      <Left>
        <div onClick={onBlock}>
          <Link href={`/user/${user.id}`}>
            <a>
              <Avatar size={48}>{user.nickname[0]}</Avatar>
            </a>
          </Link>
        </div>
      </Left>
      <Right>
        <Header>
          <div onClick={onBlock}>
            <Link href={`/user/${user.id}`}>
              <a>{user.nickname}</a>
            </Link>
          </div>
          <div>
            <FollowButton UserId={user.id} />
          </div>
        </Header>
      </Right>
    </Wrapper>
  );
};

export default React.memo(PostItem);
