import { LogoutOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { logout } from '../../reducers/auth/auth.slice';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & + & {
    margin-top: 12px;
  }
`;
const StyledButton = styled(Button)`
  padding: 0;
`;
const Icon = styled.div`
  display: none;
  @media only screen and (max-width: 1281px) {
    display: inline-block;
  }
`;
const Text = styled.div`
  @media only screen and (max-width: 1281px) {
    display: none;
  }
`;

const LogoutButton = ({ icon, text, onClick }) => {
  return (
    <Wrapper>
      <StyledButton size="large" type="primary" shape="round" onClick={onClick}>
        <Icon>{icon}</Icon>
        <Text>{text}</Text>
      </StyledButton>
    </Wrapper>
  );
};

export default React.memo(LogoutButton);
