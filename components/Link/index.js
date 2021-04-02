import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const Anchor = styled.a`
  display: flex;
  width: 50%;
  height: 60px;
  color: white;
  border-radius: 9999px;
  background-color: #40a9ff;
  align-items: center;
  justify-content: center;
  & + & {
    margin-top: 12px;
  }
`;
const IconWrapper = styled.div``;
const Text = styled.div`
  @media only screen and (max-width: 1281px) {
    display: none;
  }
`;
const index = ({ href, icon, text }) => {
  return (
    <Link href={href}>
      <Anchor>
        <IconWrapper>{icon}</IconWrapper>
        <Text>{text}</Text>
      </Anchor>
    </Link>
  );
};

export default React.memo(index);
