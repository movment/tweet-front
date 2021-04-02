import { Button, Form, Input, message } from 'antd';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import styled from 'styled-components';
import { unwrapResult } from '@reduxjs/toolkit';
import { signup } from '../../../reducers/auth/signup.slice';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
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
const Wrapper = styled.div`
  width: 400px;
  @media (max-width: 450px) {
    width: 90%;
  }
`;

const SingupForm = () => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const onFinish = useCallback(
    async (values) => {
      try {
        const result = await dispatch(signup(values));
        unwrapResult(result);
        message.success('가입 성공');
        Router.replace('/signin');
      } catch (error) {
        message.warning(error);
      }
    },
    [dispatch],
  );
  return (
    <Wrapper>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          label="E-mail"
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The two passwords that you entered do not match!'),
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="nickname"
          label="Nickname"
          rules={[
            {
              required: true,
              message: 'Please input your nickname!',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            가입하기
          </Button>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Link href="/signin">
            <a>로그인하러 가기</a>
          </Link>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

export default SingupForm;
