import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URI;
axios.defaults.baseURL = BACKEND_URL;

// 회원 등록
export const registerUser = async ({
  userId,
  userName,
  userAge,
  memberLocation,
  coo1,
  coo2,
}) => {
  return axios.post('/api/user/register', {
    userId: userId,
    userName: userName,
    userAge: userAge,
    userDefaultLocation: memberLocation,
    userProfile: null,
    coo1: coo1,
    coo2: coo2,
  });
};
