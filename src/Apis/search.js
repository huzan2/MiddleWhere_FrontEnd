// src/Apis/search.js
import axios from 'axios';

//  중간지점 검색
export const searchMidpoint = async ({ locations, category }) => {
  const res = await axios.post('/api/search/where', {
    locations,
    category,
  });
  return res.data;
};

//  추천 카테고리 갱신
export const getCategoryRecommendation = async (tag) => {
  const res = await axios.get(`/api/search/category/${tag}`);
  return res.data;
};

//  검색 결과 공유
export const shareSearchResult = async () => {
  const res = await axios.get('/api/search/share');
  return res.data;
};