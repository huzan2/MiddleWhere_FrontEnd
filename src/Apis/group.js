
import axios from 'axios';

// 내 그룹 목록 조회
export const getUserGroups = async (userId) => {
  const res = await axios.get(`/api/user/mygroup/${userId}`);
  return res.data;
};

// 그룹 생성
export const createGroup = async ({ groupName, ownerId }) => {
  return axios.post(`/api/group/create`, { groupName, ownerId });
};

// 그룹 상세보기
export const getGroupDetail = async (groupId) => {
  const res = await axios.get(`/api/group/info/${groupId}`);
  return res.data;
};

// 그룹 수정
export const updateGroupInfo = async ({ groupId, groupName }) => {
  return axios.post(`/api/group/edit`, { groupId, groupName });
};

// 그룹 삭제
export const deleteGroup = async (groupId) => {
  return axios.delete(`/api/group/delete/${groupId}`);
};

// 그룹 탈퇴
export const leaveGroup = async (userId) => {
  return axios.delete(`/api/group/quit/${userId}`);
};
