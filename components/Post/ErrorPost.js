import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';
import styled from 'styled-components';
const Error = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
`;
const ErrorPost = () => {
  return (
    <Error>
      <div>
        <Spin indicator={<LoadingOutlined spin />} />
      </div>
      <div>존재하지 않는 포스트입니다.</div>
    </Error>
  );
};

export default ErrorPost;
