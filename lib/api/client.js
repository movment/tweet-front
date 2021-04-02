import axios from 'axios';

const client = axios.create({
  baseURL: 'https://doinki.com',
  withCredentials: true,
});

export default client;
