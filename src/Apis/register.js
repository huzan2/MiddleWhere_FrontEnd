import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URI;
axios.defaults.baseURL = BACKEND_URL;

// 회원 등록
export const registerUser = async ({
  userId,
  nickname,
  age,
  defaultLocation,
}) => {
  return axios.post('/api/user/register', {
    userId: userId,
    userName: nickname,
    userAge: age,
    userDefaultLocation: defaultLocation,
    userProfile: null,
  });
};
