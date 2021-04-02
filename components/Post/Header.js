import styled from 'styled-components';

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${({ height }) => height || '20px'};
  margin-bottom: 2px;
  font-size: 15px;
  font-weight: 600;
  & a {
    color: black;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default Header;
