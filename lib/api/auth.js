import client from './client';

const login = (obj) => client.post('/api/auth/login', obj);
const logout = () => client.post('/api/auth/logout');
const check = () => client.get('/api/auth/check');
const signup = (obj) => client.post('/api/auth/signup', obj);

export default { login, logout, check, signup };
