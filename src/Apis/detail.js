import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URI;
axios.defaults.baseURL = BACKEND_URL;

// 검색 결과 공유 요청
export const requestShareSearchResult = async () => {
  const res = await axios.get('/api/search/share');
  return res.data;
};
