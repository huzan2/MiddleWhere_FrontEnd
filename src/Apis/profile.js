import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URI;
axios.defaults.baseURL = BACKEND_URL;

// 사용자 정보 수정
export const updateUserInfo = async ({
  userId,
  userName,
  userAge,
  memberLocation,
  coo1,
  coo2,
}) => {
  return axios.post('/api/user/edit', {
    userId: userId,
    userName: userName,
    userAge: userAge,
    userDefaultLocation: memberLocation,
    coo1: coo1,
    coo2: coo2,
  });
};

// 사용자 탈퇴
export const deleteUser = async (userId) => {
  return axios.post(`/api/user/exit`, {
    userId: userId,
  });
};

export const getUserInfo = async (userId) => {
  return axios.get(`/api/user/info/${userId}`);
};
