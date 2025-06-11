import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URI;
axios.defaults.baseURL = BACKEND_URL;

// 친구 목록 조회
export const getFriendList = async (userId) => {
  const res = await axios.get(`/api/friend/list/${userId}`);
  return res.data;
};

// 친구 추가
export const addFriend = async (userId, friendCode) => {
  return axios.post(`/api/friend/add/${userId}`, { friendCode });
};

// 친구 삭제
export const deleteFriend = async (userId, friendId) => {
  return axios.delete(`/api/friend/delete/${userId}`, {
    data: { friendId },
  });
};

// 친구 상세보기
export const getFriendDetail = async (userId) => {
  const res = await axios.get(`/api/friend/info/${userId}`);
  return res.data;
};
