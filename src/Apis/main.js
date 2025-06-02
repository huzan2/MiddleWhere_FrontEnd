
import axios from 'axios';

// 내 모임 목록 조회
export const getMyMeetings = async (userId) => {
  const res = await axios.get(`/api/user/mymeet/${userId}`);
  return res.data;
};

// 내 그룹 목록 조회
export const getMyGroups = async (userId) => {
  const res = await axios.get(`/api/user/mygroup/${userId}`);
  return res.data;
};
