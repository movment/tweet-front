import { Avatar, Comment } from 'antd';
import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Wrapper = styled.div`
  & + & {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
`;
const CommentItem = ({ comment }) => {
  return (
    <Wrapper>
      <Comment
        key={comment.id}
        author={
          <Link href={`/user/${comment.UserId}`}>
            <a>{comment.User.nickname}</a>
          </Link>
        }
        avatar={<Avatar>{comment.User.nickname[0]}</Avatar>}
        content={<p>{comment.content}</p>}
      />
    </Wrapper>
  );
};

export default React.memo(CommentItem);
