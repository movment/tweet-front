import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import CommentItem from './CommentItem';
import Pagination from './Pagination';

const Wrapper = styled.div`
  padding: 0 16px;
`;

const NoData = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
`;

const CommentList = () => {
  const { comments, total } = useSelector(({ comment }) => comment);

  if (!comments?.length) return <NoData>No Comments</NoData>;

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
