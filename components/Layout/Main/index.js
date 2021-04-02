import React from 'react';
import styled from 'styled-components';
import Title from '../../Title';
import MainRight from './MainRight';

const Main = styled.main`
  display: flex;
  flex-grow: 1;
`;
const Container = styled.div`
  display: flex;
  width: 990px;
  justify-content: space-between;
  @media only screen and (max-width: 1094px) {
    width: 920px;
  }
  @media only screen and (max-width: 1024px) {
    width: 600px;
  }
  @media only screen and (max-width: 704px) {
    width: 100%;
  }
`;

const MainLeft = styled.div`
  background-color: white;
  width: 600px;
  border-left: 1px solid #ebeef0;
  border-right: 1px solid #ebeef0;
  @media only screen and (max-width: 704px) {
    width: 100%;
  }
`;

const Center = ({ children }) => {
  return (
    <Main>
      <Container>
        <MainLeft>{children}</MainLeft>
        <MainRight />
      </Container>
    </Main>
  );
};

export default React.memo(Center);
