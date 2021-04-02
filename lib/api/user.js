import client from './client';

export const follow = (obj) => client.put('/api/user/follow', obj);
export const unfollow = (obj) => client.patch('/api/user/unfollow', obj);
export const getProfile = (obj) => client.get(`/api/user/${obj.UserId}`);
export const getFollowers = (obj) =>
  client.get(`/api/user/${obj.UserId}/followers`);
export const getFollowings = (obj) =>
  client.get(`/api/user/${obj.UserId}/followings`);
