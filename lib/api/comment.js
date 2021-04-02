import client from './client';
import queryString from 'query-string';

const getComments = (obj) => {
  const query = queryString.stringify({
    page: obj.page || 1,
  });

  return client.get(`/api/post/${obj.PostId}/comments?${query}`);
};
const addComment = (obj) => client.post(`/api/post/${obj.PostId}/comment`, obj);

export default {
  getComments,
  addComment,
};
