import client from './client';

const getHashtags = () => client.get('/api/hashtags');

export default { getHashtags };
