
import axios from 'axios';

// 사용자 정보 수정
export const updateUserInfo = async ({ userId, nickname, age, defaultLocation }) => {
  return axios.post('/api/user/edit', {
    userId,
    nickname,
    age,
    defaultLocation,
  });
};

// 사용자 탈퇴
export const deleteUser = async (userId) => {
  return axios.delete(`/api/user/exit/${userId}`);
};
