import { unwrapResult } from '@reduxjs/toolkit';
import { Button, Form, Input, message } from 'antd';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import styled from 'styled-components';
import { login } from '../../../reducers/auth/auth.slice';
import client from '../../../lib/api/client';
const Wrapper = styled.div`
  width: 400px;
  @media (max-width: 450px) {
    width: 90%;
  }
`;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const onFinish = useCallback(
    async (values) => {
      try {
        const result = await dispatch(login(values));
        unwrapResult(result);
      } catch (error) {
        message.warning(error);
      }
    },
    [dispatch],
  );

  return (
    <Wrapper>
      <Form {...layout} name="basic" onFinish={onFinish}>
        <Form.Item
          label="E-mail"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            로그인
          </Button>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Link href="/signup">
            <a>가입하러 가기</a>
          </Link>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

export default LoginForm;
