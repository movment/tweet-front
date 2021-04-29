import Link from 'next/link';
import { Avatar } from 'antd';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import ButtonBar from './ButtonBar';
import Header from './Header';
import Content from './Content';
import { useRouter } from 'next/dist/client/router';
import FollowButton from '../Button/FollowButton';
import Img from 'next/image';

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
const ImgWrapper = styled.div`
  margin-top: 16px;
`;
const StyledImg = styled(Img)`
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.8;
  }
`;

const PostItem = ({ post }) => {
  const router = useRouter();
  const onClick = useCallback(
    (e) => {
      e.preventDefault();
      router.push(`/post/${post.id}`);
    },
    [post.id, router],
  );
  const onBlock = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  return (
    <Wrapper onClick={onClick}>
      <Left>
        <div onClick={onBlock}>
          <Link href={`/user/${post.UserId}`}>
            <a>
              <Avatar size={48}>{post.User.nickname[0]}</Avatar>
            </a>
          </Link>
        </div>
      </Left>
      <Right>
        <Header>
          <div onClick={onBlock}>
            <Link href={`/user/${post.UserId}`}>
              <a>{post.User.nickname}</a>
            </Link>
          </div>
          <div>
            <FollowButton UserId={post.User.id} />
          </div>
        </Header>
        {post.Images?.[0]?.src && (
          <ImgWrapper>
            <StyledImg
              width={500}
              height={500}
              src={`https://doinki.com/images/${post.Images?.[0]?.src}`}
            />
          </ImgWrapper>
        )}
        <Content postData={post.content} />
        <ButtonBar post={post} />
      </Right>
    </Wrapper>
  );
};

export default React.memo(PostItem);
