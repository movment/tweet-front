import { RocketTwoTone } from '@ant-design/icons';
import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import { check } from '../reducers/auth/auth.slice';
import { wrapper } from '../reducers/store';
import client from '../lib/api/client';
import { getToken, verifyToken } from '../lib/jwt/check';
import styled from 'styled-components';
import Title from '../components/Form/Title';
import SingupForm from '../components/Form/SignupForm';

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
`;
const Signup = () => {
  const { isLoggedIn } = useSelector(({ auth }) => auth);

  if (isLoggedIn) Router.replace('/');

  return (
    <Wrapper>
      <Title>
        {' '}
        <Link href="/">
          <a>
            <RocketTwoTone />
          </a>
        </Link>{' '}
        가입하기
      </Title>
      <SingupForm />
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
export default Signup;
