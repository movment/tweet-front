import { unwrapResult } from '@reduxjs/toolkit';
import { Form, Input, Button } from 'antd';
import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useInput from '../../lib/hooks/useInput';
import { addComment } from '../../reducers/comment/comment.slice';

const Comment = ({ postId }) => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(({ auth }) => auth);

  const [value, onChange, setValue] = useInput('');

  const onFinish = useCallback(async () => {
    try {
      const result = await dispatch(
        addComment({
          PostId: postId,
          content: value,
        }),
      );
      unwrapResult(result);
      setValue('');
    } catch (error) {
      alert('다시 시도해주세요.');
    }
  }, [postId, value, dispatch]);

  if (!isLoggedIn) return null;

  return (
    <Form onFinish={onFinish}>
      <Form.Item>
        <Input.TextArea value={value} onChange={onChange} rows={3} />
        <Button type="primary" htmlType="submit">
          댓글
        </Button>
      </Form.Item>
    </Form>
  );
};

export default React.memo(Comment);
