import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import {
  ContainerOutlined,
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  SlackOutlined,
  SmileOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Nav from '../../Nav';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../reducers/thunk';
import StyledButton from '../../Button/StyledButton';
import { useRouter } from 'next/router';

const Wrapper = styled.header`
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
  @media only screen and (max-width: 704px) {
    flex-grow: 0;
  }
`;
const FixedWrapper = styled.div`
  width: 275px;
  @media only screen and (max-width: 1281px) {
    width: 88px;
  }
`;
const Container = styled.div`
  position: fixed;
  width: 275px;
  top: 0;
  bottom: 0;
  @media only screen and (max-width: 1281px) {
    width: 88px;
    padding: 0 12px;
  }
`;
const NavTop = styled.div`
  flex: 1;
`;
const NavBottom = styled.div``;
const BtnWrapper = styled.div`
  padding: 12px 0;
`;
const NavWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;
const Header = () => {
  const router = useRouter();
  const user = useSelector(({ auth }) => auth.user);
  const dispatch = useDispatch();
  const onLogout = useCallback(() => {
    dispatch(logout());
  }, []);
  const onSignin = useCallback(() => {
    router.push('/signin');
  }, []);
  const onSignup = useCallback(() => {
    router.push('/signup');
  }, []);
  return (
    <Wrapper>
      <FixedWrapper>
        <Container>
          <NavWrapper>
            <NavTop>
              <Nav selected icon={<SlackOutlined />} href="/" />

              <Nav selected icon={<HomeOutlined />} text="홈" href="/" />

              {user && (
                <>
                  <Nav
                    selected
                    icon={<ContainerOutlined />}
                    text="내 트윗"
                    href={`/user/${user.id}`}
                  />
                  <Nav
                    selected
                    icon={<SmileOutlined />}
                    text="팔로워"
                    href={`/user/${user.id}/follower`}
                  />
                  <Nav
                    selected
                    icon={<UserOutlined />}
                    text="팔로잉"
                    href={`/user/${user.id}/following`}
                  />
                </>
              )}
            </NavTop>
            <NavBottom>
              <BtnWrapper>
                {user ? (
                  <StyledButton
                    icon={<LogoutOutlined />}
                    text="로그아웃"
                    onClick={onLogout}
                  />
                ) : (
                  <>
                    <StyledButton
                      icon={<LoginOutlined />}
                      text="로그인"
                      onClick={onSignin}
                    />
                    <StyledButton
                      icon={<UserAddOutlined />}
                      text="회원가입"
                      onClick={onSignup}
                    />
                  </>
                )}
              </BtnWrapper>
            </NavBottom>
          </NavWrapper>
        </Container>
      </FixedWrapper>
    </Wrapper>
  );
};

export default Header;
