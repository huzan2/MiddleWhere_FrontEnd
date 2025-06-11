// src/Apis/create.js
import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URI;
axios.defaults.baseURL = BACKEND_URL;

// 친구 목록 불러오기
export const fetchFriendList = async (userId) => {
  const res = await axios.get(`/api/friend/list/${userId}`);
  return res.data;
};

// 모임 정보 등록
export const registerMeetingInfo = async ({ meetName, userId }) => {
  const res = await axios.post('/api/meeting/info', {
    meetName,
    userId,
  });
  return res.data;
};

// 모임 사용자 추가
export const addMeetingUser = async ({ meetId, userId }) => {
  return axios.post('/api/meeting/adduser', {
    meetId,
    userId,
  });
};

// 모임 사용자 초대
export const inviteUserToMeeting = async ({ userId, meetId }) => {
  return axios.post('/api/meeting/inviteuser', {
    userId,
    meetId,
  });
};
