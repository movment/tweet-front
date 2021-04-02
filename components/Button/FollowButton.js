import { Button } from 'antd';
import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { follow, unfollow } from '../../reducers/thunk';

const FollowButton = ({ UserId }) => {
  const { user } = useSelector(({ auth }) => auth);
  const other = useSelector(({ post }) => post.users[UserId]);
  const dispatch = useDispatch();

  const isFollowing = other?.isFollowing || false;

  const onClick = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (isFollowing) {
        dispatch(unfollow({ UserId: UserId }));
      } else {
        dispatch(follow({ UserId: UserId }));
      }
    },
    [isFollowing, UserId],
  );

  return !user || UserId === user.id ? null : (
    <Button onClick={onClick}>{isFollowing ? '언팔로우' : '팔로우'}</Button>
  );
};

export default React.memo(FollowButton);
