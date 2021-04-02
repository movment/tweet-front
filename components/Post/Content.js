// import React from 'react';
// import styled from 'styled-components';

// const Content = styled.div`
//   line-height: 1.75;
//   font-size: ${({ size }) => size || '15px'};
// `;

// export default Content;
import React, { useCallback } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Wrapper = styled.div`
  color: #0f1419;
  line-height: 1.75;
  font-size: ${(props) => (props.large ? '23px' : '15px')};
`;
const PostCardContent = ({ postData, large }) => {
  const onClick = useCallback((e) => {
    e.stopPropagation();
  }, []);
  return (
    <Wrapper large={large}>
      {postData?.split(/(#[^\s#]+)/g).map((v, i) => {
        if (v.match(/(#[^\s#]+)/)) {
          return (
            <Link href={`/hashtag/${v.slice(1)}`} key={i}>
              <a onClick={onClick}>{v}</a>
            </Link>
          );
        }
        const arr = v.split(/\n/g);
        const length = arr.length;

        arr.map((cur, i) => {
          if (i === length - 1) {
            return <span>{cur}</span>;
          }
          <>
            <span>{cur}</span>
            <br />
          </>;
        });
        return arr.map((cur, i) => {
          if (i === length - 1) {
            return <span key={i}>{cur}</span>;
          }
          return (
            <span key={i}>
              {cur} <br />
            </span>
          );
        });
      })}
    </Wrapper>
  );
};

export default React.memo(PostCardContent);
