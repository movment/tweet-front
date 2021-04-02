import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import CommentItem from './CommentItem';
import Pagination from './Pagination';

const Wrapper = styled.div`
  padding: 0 16px;
`;

const CommentList = () => {
  const { comments, total } = useSelector(({ comment }) => comment);

  if (!comments) return null;

  return (
    <Wrapper>
      {comments?.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
      <Pagination total={total} />
    </Wrapper>
  );
};

export default React.memo(CommentList);
