// src/Apis/user.js
import axios from 'axios';

//  회원 정보 수정
export const updateUserInfo = async ({ userId, userName, userAge, userDefaultLocation }) => {
  return axios.post('/api/user/edit', {
    userId,
    userName,
    userAge,
    userDefaultLocation,
  });
};

//  회원 탈퇴
export const deleteUser = async (userId) => {
  return axios.delete('/api/user/exit', {
    data: { userId },
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
