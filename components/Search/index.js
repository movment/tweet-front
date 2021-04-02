import { SearchOutlined } from '@ant-design/icons';
import { useRouter } from 'next/dist/client/router';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import useInput from '../../lib/hooks/useInput';

const Wrapper = styled.div`
  display: flex;
  height: 44px;
  border-radius: 9999px;
  background-color: #ebeef0;
  border: 1px solid transparent;
  &:focus-within {
    background-color: white;
    border: 1px solid #1da1f2;
    & svg {
      color: #1da1f2;
    }
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 44px;
`;
const Icon = styled.div`
  display: flex;
  width: 100%;
  color: #5b7083;
  font-size: 15px;
  align-items: center;
  padding-left: 12px;
  justify-content: center;
`;
const Form = styled.div`
  width: 100%;
  display: flex;
`;
const StyledSearch = styled.input`
  width: 100%;
  border: none;
  padding: 12px;
  font-size: 15px;
  background-color: transparent;
  &:focus {
    outline: none;
  }
`;

const Search = () => {
  const router = useRouter();
  const [value, onChange, setValue] = useInput('');
  const onKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        if (value) router.push(`/search/${value}`);
        setValue('');
      }
    },
    [value],
  );
  return (
    <Wrapper>
      <IconWrapper>
        <Icon>
          <SearchOutlined />
        </Icon>
      </IconWrapper>
      <StyledSearch
        placeholder="트위터 검색"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </Wrapper>
  );
};

export default Search;
