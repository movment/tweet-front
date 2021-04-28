import { ArrowLeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/dist/client/router';
import React, { useCallback } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  /* box-sizing: border-box; */
  display: flex;
  align-items: center;
  height: 53px;
  padding: 0 16px;
  border-bottom: 1px solid #ebeef0;
`;
const T = styled.div`
  display: flex;
  color: black;
  font-size: 20px;
  font-weight: 800;
  align-items: center;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 38px;
  height: 38px;
  font-size: 16px;
  margin-right: 16px;
  border-radius: 100%;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: rgb(232, 245, 254);
  }
  & svg {
    color: #1da1f2;
  }
`;

const Title = ({ children, home }) => {
  const router = useRouter();
  const onClick = useCallback(() => {
    router.back();
  }, [router]);
  return (
    <Wrapper>
      {!home && (
        <ButtonWrapper onClick={onClick}>
          <ArrowLeftOutlined />
        </ButtonWrapper>
      )}
      <T>{children}</T>
    </Wrapper>
  );
};

export default React.memo(Title);
