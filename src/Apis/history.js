
import axios from 'axios';

// 히스토리 목록 조회
export const getHistoryList = async (userId) => {
  const res = await axios.get(`/api/history/${userId}`);
  return res.data;
};

// 피드백 등록
export const submitFeedback = async (historyId, feedback) => {
  return axios.post(`/api/history/feedback`, {
    historyId,
    feedback,
  });
};
