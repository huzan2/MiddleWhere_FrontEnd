import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URI;
axios.defaults.baseURL = BACKEND_URL;

// 문의사항 목록 조회
export const getQuestionList = async () => {
  const res = await axios.get('/api/question/list');
  return res.data;
};

// 문의사항 등록
export const submitQuestion = async ({ userId, title, content }) => {
  return axios.post('/api/question/add', {
    userId,
    title,
    content,
  });
};

// 문의사항 상세 조회
export const getQuestionDetail = async (questionId) => {
  const res = await axios.get(`/api/question/check/${questionId}`);
  return res.data;
};
