import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 4px 0;
  font-size: 20px;
  font-weight: 600;
  @media only screen and (max-width: 1281px) {
    justify-content: center;
  }
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 9999px;
  /* color: rgb(24, 144, 255); */
  color: ${({ selected }) => (selected ? 'rgb(24, 144, 255)' : 'black')};
  transition: background-color 0.2s;
  &:hover {
    background-color: rgb(232, 245, 254);
  }
`;
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 26px;
`;
const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  margin-right: 16px;
  @media only screen and (max-width: 1281px) {
    display: none;
  }
`;

const Nav = ({ icon, text, selected }) => {
  return (
    <Wrapper>
      <Container selected={selected}>
        <IconWrapper>{icon}</IconWrapper>
        <TextWrapper>{text}</TextWrapper>
      </Container>
    </Wrapper>
  );
};

export default React.memo(Nav);
