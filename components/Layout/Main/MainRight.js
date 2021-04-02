import React from 'react';
import styled from 'styled-components';
import Search from '../../Search';
import Trend from '../../Trend';

const Wrapper = styled.div`
  width: 350px;
  background-color: white;
  margin-right: 10px;
  @media only screen and (max-width: 1094px) {
    width: 290px;
  }
  @media only screen and (max-width: 1024px) {
    display: none;
  }
`;
const Container = styled.div`
  position: fixed;
  width: 350px;
  top: 0;
  bottom: 0;
  @media only screen and (max-width: 1094px) {
    width: 290px;
  }
`;
const NavWrapper = styled.div`
  display: flex;
  padding-top: 6px;
  flex-direction: column;
  height: 100%;
`;
const MainRight = () => {
  return (
    <Wrapper>
      <Container>
        <NavWrapper>
          <Search />
          <Trend />
        </NavWrapper>
      </Container>
    </Wrapper>
  );
};

export default MainRight;
