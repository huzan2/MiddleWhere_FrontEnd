import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URI;
axios.defaults.baseURL = BACKEND_URL;

// 내 모임 목록 조회
export const getMyMeetings = async (userId) => {
  axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URI;
  const res = await axios.get(`/api/user/mymeeting/${userId}`);
  return res.data;
};

// 내 그룹 목록 조회
export const getMyGroups = async (userId) => {
  axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URI;
  const res = await axios.get(`/api/user/mygroup/${userId}`);
  return res.data;
};
