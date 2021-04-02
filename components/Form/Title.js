import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  font-size: 32px;
  height: 40px;
  display: flex;
  align-items: center;
  margin: 32px 0;
`;
const Title = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default React.memo(Title);
