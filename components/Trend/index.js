import { useRouter } from 'next/dist/client/router';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #f7f9fa;
  margin-top: 16px;
  border-radius: 16px;
  & > div + div {
    border-top: 1px solid #ebeef0;
  }
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  font-size: 20px;
  font-weight: 600;
  height: 50px;
`;
const Container = styled.div`
  cursor: pointer;
  padding: 12px 16px;
  &:last-child {
    border-radius: 0 0 16px 16px;
  }
  transition: background-color 0.2s;
  &:hover {
    background-color: #eff1f2;
  }
`;
const Content = styled.div`
  color: #0f1419;
  font-size: 15px;
  font-weight: 600;
`;
const Count = styled.div`
  color: #5b7083;
  margin-top: 4px;
  font-size: 13px;
`;

const Trend = () => {
  const hashtags = useSelector(({ hashtag }) => hashtag.hashtags);
  const router = useRouter();
  const onClick = useCallback(
    (tag) => () => {
      router.push(`/hashtag/${tag}`);
    },
    [router],
  );
  return (
    <Wrapper>
      <Title>나를 위한 트렌드</Title>
      {hashtags.map((hashtag) => (
        <Container key={hashtag.id} onClick={onClick(hashtag.name)}>
          <Content>#{hashtag.name}</Content>
          <Count>{hashtag.count} 개</Count>
        </Container>
      ))}
    </Wrapper>
  );
};

export default Trend;
