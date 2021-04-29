import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostItem from './PostItem';
import { getMorePosts } from '../../reducers/post/post.slice';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
`;

const throtle = (callback, ms) => {
  let loading = false;
  return () => {
    if (!loading) {
      loading = setTimeout(() => {
        callback();
        loading = false;
      }, ms);
    }
  };
};

const PostList = ({ userid, hashtag, search }) => {
  const { posts, more } = useSelector(({ post }) => post);
  const dispatch = useDispatch();

  useEffect(() => {
    const onScroll = throtle(() => {
      if (
        window.pageYOffset + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (more) {
          dispatch(
            getMorePosts({
              LastId: posts[posts.length - 1]?.id,
              UserId: userid,
              Hashtag: hashtag,
              search,
            }),
          );
        }
      }
    }, 700);

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [posts, search, userid, more, hashtag, dispatch]);

  if (!posts?.length) return <Wrapper>No Tweets</Wrapper>;

  return (
    <div>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default React.memo(PostList);
