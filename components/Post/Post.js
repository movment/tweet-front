import { UserOutlined } from '@ant-design/icons';
import Head from 'next/head';
import { Avatar } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ButtonBar from './ButtonBar';
import Content from './Content';
import Header from './Header';
import ErrorPost from './ErrorPost';
import Link from 'next/link';
import CommentList from '../Comment/CommentList';
import CommentForm from '../Comment/CommentForm';
import FollowButton from '../Button/FollowButton';
import Br from '../Br';

const Wrapper = styled.article`
  display: flex;
  padding: 12px 16px;
  height: 100px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const Profile = styled.div`
  display: flex;
  align-items: center;
  & > div {
    margin-left: 12px;
  }
`;
const StyledImg = styled.img`
  margin-top: 6px;
`;
const Post = () => {
  const posts = useSelector(({ post }) => post.posts);

  if (!posts.length) return <ErrorPost />;
  const post = posts[0];

  return (
    <>
      <Head>
        <title>Post | Tweet</title>
        <meta name="description" content={post.content || 'Post'} />
        <meta property="og:title" content={`Post | Tweet`} />
        <meta property="og:description" content={post.content || 'Post'} />
        <meta property="og:image" content={post.Images?.[0]?.src || ''} />
        <meta
          property="og:url"
          content={`https://doinki.com/post/${post.id}`}
        />
      </Head>
      <Wrapper>
        <Container>
          <Header height="48px">
            <Profile>
              <Link href={`/user/${post.UserId}`}>
                <a>
                  <Avatar size={48}>{post.User.nickname[0]}</Avatar>
                </a>
              </Link>
              <div>
                <Link href={`/user/${post.UserId}`}>
                  <a>{post.User.nickname}</a>
                </Link>
              </div>
            </Profile>
            <div>
              <FollowButton UserId={post.User.id} />
            </div>
          </Header>
          {post.Images?.[0]?.src && (
            <StyledImg
              width="100%"
              // height="100%"
              src={`https://doinki.com/images/${post.Images?.[0]?.src}`}
            />
          )}
          <Content large postData={post.content}></Content>
          <ButtonBar large post={post} />
          <Br />
          <br />
          <CommentForm postId={post.id} />
          <CommentList />
        </Container>
      </Wrapper>
    </>
  );
};

export default Post;
