import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export const getToken = (cookies = '') => {
  const obj = cookie.parse(cookies);
  return obj.token;
};

export const verifyToken = (token) => {
  try {
    const user = jwt.verify(token, process.env.JWT_KEY);
    delete user.iat;
    delete user.exp;
    return user;
  } catch (error) {
    return null;
  }
};
