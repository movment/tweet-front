import React, { useCallback } from 'react';
import {
  EllipsisOutlined,
  HeartOutlined,
  HeartTwoTone,
  MessageOutlined,
  RetweetOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  deletePost,
  likePost,
  unlikePost,
} from '../../reducers/post/post.slice';
import { Button, message, Popover } from 'antd';

const ButtonWrapper = styled.div`
  height: ${({ large }) => (large ? '40px' : '20px')};
  display: flex;
  width: ${({ large }) => (large ? '100%' : '425px')};
  margin-top: 12px;
  justify-content: ${({ large }) => (large ? 'space-around' : 'space-between')};
  @media only screen and (max-width: 623px) {
    width: 100%;
  }
`;
const BtnWrapper = styled.div`
  cursor: pointer;
  display: flex;
  margin-top: -6px;
  margin-left: -8px;
  justify-content: center;
  align-items: center;
  width: ${({ large }) => (large ? '38px' : '34px')};
  height: ${({ large }) => (large ? '38px' : '34px')};
  font-size: ${({ large }) => (large ? '20px' : '18px')};
  transition: background-color 0.2s;
  border-radius: 9999px;
  &:hover {
    background-color: ${({ bgcolor }) => bgcolor};
    & svg {
      color: ${({ color }) => color};
    }
  }
  & svg {
    color: #8493a2;
    transition: color 0.2s;
  }
`;

const ButtonBar = ({ large, post }) => {
  const { isLoggedIn, user } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();
  const onLike = useCallback(
    (e) => {
      // e.preventDefault();
      e.stopPropagation();

      if (!isLoggedIn) {
        message.warning('로그인 해주세요');
      } else {
        if (post.Likers?.length) {
          dispatch(unlikePost({ PostId: post.id }));
        } else {
          dispatch(likePost({ PostId: post.id }));
        }
      }
    },
    [isLoggedIn, post.Likers],
  );
  const onBlock = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  const onRetweet = useCallback((e) => {
    e.stopPropagation();
    message.warning('기능 구현중');
  });
  const onRemove = useCallback(
    (e) => {
      e.stopPropagation();

      dispatch(deletePost({ PostId: post.id }));
    },
    [dispatch, post.id],
  );
  return (
    <ButtonWrapper large={large}>
      <BtnWrapper color="#1da1f2" bgcolor="#e8f5fe" large={large}>
        <MessageOutlined />
      </BtnWrapper>
      <BtnWrapper
        color="#60D193"
        bgcolor="#E0F1E8"
        large={large}
        onClick={onRetweet}
      >
        <RetweetOutlined />
      </BtnWrapper>
      <BtnWrapper
        color="#E7618A"
        bgcolor="#F5E2E8"
        large={large}
        onClick={onLike}
      >
        {post.Likers?.length ? (
          <HeartTwoTone twoToneColor="#eb2f96" />
        ) : (
          <HeartOutlined />
        )}
      </BtnWrapper>
      <BtnWrapper color="#1da1f2" bgcolor="#e8f5fe" large={large}>
        {/* <UploadOutlined /> */}
        <Popover
          content={
            <Button.Group onClick={onBlock}>
              {isLoggedIn && user?.id === post.UserId ? (
                <>
                  <Button onClick={onBlock}>수정</Button>
                  <Button type="danger" onClick={onRemove}>
                    삭제
                  </Button>
                </>
              ) : (
                <Button>신고</Button>
              )}
            </Button.Group>
          }
        >
          <EllipsisOutlined />
        </Popover>
      </BtnWrapper>
    </ButtonWrapper>
  );
};

export default React.memo(ButtonBar);
