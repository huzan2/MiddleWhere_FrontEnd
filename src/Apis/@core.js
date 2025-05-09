import axios from 'axios';

// const BACKEND_URL = import.meta.env.VITE_BACKEND_URI;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URI;
axios.defaults.baseURL = BACKEND_URL;

const baseAPI = (url = BACKEND_URL, options) => {
  const instance = axios.create({ baseURL: url, ...options });
  return instance;
};

const baseAuthAPI = (url = BACKEND_URL, options) => {
  // const token = localStorage.getItem('token');
  const instance = axios.create({
    baseURL: BACKEND_URL,
    //headers: { Authorization: token },
    ...options,
  });
  return instance;
};

export const axiosInstance = baseAPI();
export const authInstance = baseAuthAPI();
