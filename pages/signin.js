import { RocketTwoTone } from '@ant-design/icons';
import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import styled from 'styled-components';
import { check } from '../reducers/auth/auth.slice';
import { wrapper } from '../reducers/store';
import client from '../lib/api/client';
import { getToken, verifyToken } from '../lib/jwt/check';
import LoginForm from '../components/Form/LoginForm';
import Title from '../components/Form/Title';

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
`;

const Login = () => {
  const { isLoggedIn } = useSelector(({ auth }) => auth);

  if (isLoggedIn) Router.replace('/');

  return (
    <Wrapper>
      <Title>
        <Link href="/">
          <a>
            <RocketTwoTone />
          </a>
        </Link>{' '}
        로그인
      </Title>

      <LoginForm />
    </Wrapper>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req?.headers.cookie || '';
    client.defaults.headers.Cookie = '';
    const token = getToken(cookie);
    const user = verifyToken(token);
    context.store.dispatch(check(user));
  },
);
export default Login;
