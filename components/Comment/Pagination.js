import { Pagination } from 'antd';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getComments } from '../../reducers/comment/comment.slice';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const StyledPagination = ({ total }) => {
  const [current, setCurrent] = useState(1);
  const { posts } = useSelector(({ post }) => post);
  const dispatch = useDispatch();

  const post = posts?.[0];
  const onChange = useCallback(
    (page) => {
      setCurrent(page);
      dispatch(getComments({ PostId: post.id, page }));
    },
    [dispatch, post?.id],
  );
  // if (!total) return null;
  return (
    <Wrapper>
      <Pagination
        current={current}
        defaultCurrent={1}
        onChange={onChange}
        total={total || 1}
      />
    </Wrapper>
  );
};

export default React.memo(StyledPagination);
