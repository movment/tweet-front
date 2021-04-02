import client from './client';
import queryString from 'query-string';

export const getPost = (obj) => client.get(`/api/post/${obj.PostId}`);
export const getPosts = (obj = {}) => {
  const query = queryString.stringify({
    userid: obj.UserId,
    lastid: obj.LastId,
    hashtag: obj.Hashtag,
    search: obj.search,
  });

  return client.get(`/api/posts${query ? '?' + query : ''}`);
};
export const addPost = (obj) => client.post('/api/post', obj);
export const uploadImages = (data) => client.post(`/api/post/images`, data);
export const likePost = (obj) => client.patch(`/api/post/like`, obj);
export const unlikePost = (obj) => client.patch(`/api/post/unlike`, obj);
