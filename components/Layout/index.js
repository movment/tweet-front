import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Main from './Main';

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
`;

const Layout = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      <Main>{children}</Main>
    </Wrapper>
  );
};

export default React.memo(Layout);
