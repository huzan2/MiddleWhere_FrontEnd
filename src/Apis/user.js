// src/Apis/user.js
import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URI;
axios.defaults.baseURL = BACKEND_URL;

//  회원 정보 수정
export const updateUserInfo = async ({
  userId,
  userName,
  userAge,
  userDefaultLocation,
}) => {
  return axios.post('/api/user/edit', {
    userId: userId,
    userName: userName,
    userAge: userAge,
    userDefaultLocation: userDefaultLocation,
  });
};

//  회원 탈퇴
export const deleteUser = async (userId) => {
  return axios.post('/api/user/exit', {
    userId: userId,
  });
};

//  로그인
export const loginUser = async ({ kakaoId }) => {
  return axios.post('/api/user/login', { userId: kakaoId });
};

//  로그아웃
export const logoutUser = async (userId) => {
  return axios.post('/api/user/logout', { userId });
};
